import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
  Conference,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';
import { late } from 'zod';

export async function fetchRevenue() {
  // Add noStore() here prevent the response from being cached - makes rendering dynamic
  noStore();

  try {
    const data = await sql<Revenue>`SELECT * FROM revenue`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchUpcomingConferences() {
  noStore();
  try {
    const conferences = await sql`SELECT * FROM conference`;

    const latestConferences = conferences.rows.map((conference) => ({
      ...conference,
    }));
    return latestConferences;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest conferences.');
  }
}

export async function fetchSubmittedPapers() {
  noStore();
  const user = await getUser('hector@simpson.com');
  try {
    const submittedPapers = await sql`SELECT paper.*
      FROM paper
      JOIN paper_author_link ON paper.paper_id = paper_author_link.paper_id
      JOIN uuser ON paper_author_link.author_user_id = uuser.user_id
      WHERE uuser.user_id = ${user.user_id};
    `;

    

    const latestPapers = submittedPapers.rows.map((paper) => ({
      ...paper,
    }));
    for (let i = 0; i < latestPapers.length; i++) {
      latestPapers[i].conference_id = (await getConference(latestPapers[i].conference_id)).name;
    }

    return latestPapers;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch submitted papers.');
  }
}

export async function fetchCardData() {
  noStore();
  const user = await getUser('hector@simpson.com');
  try {
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
        SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
        SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
        FROM invoices`;
    const userRoleLinkPromise = sql`SELECT 
        * FROM user_role_link
        WHERE User_id = ${user.user_id}`;
    const conferenceCountPromise = sql`SELECT COUNT(*) FROM conference`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
      userRoleLinkPromise,
      conferenceCountPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');
    let userRole = '';
    for (let i = 0; i < data[3].rows.length; i++) {
      let role = ''
      if (data[3].rows[i].role_id == '1') role = 'Author';
      else if (data[3].rows[i].role_id == '2') role = 'Reviewer';
      else role = 'Conference Chair';
      userRole += role + ', ';
    }
    // Remove the trailing comma and space
    userRole = userRole.slice(0, -2);
    const numberOfConferences = Number(data[4].rows[0].count ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
      userRole,
      numberOfConferences,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  noStore();
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM uuser WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function getConference(conf_id: string) {
  try {
    const conference = await sql`SELECT * FROM conference WHERE conference_id=${conf_id}`;
    return conference.rows[0] as Conference;
  } catch (error) {
    console.error('Failed to fetch conference:', error);
    throw new Error('Failed to fetch conference.');
  }
}
