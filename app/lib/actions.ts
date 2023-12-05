'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { randomInt, randomUUID } from 'crypto';
import { getConferenceIdByName, getUser } from './data';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const FormSchemaPaper = z.object({
  paper_id: z.string(),
  conference_name: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
});
 
// Use Zod to update the expected types
const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
const SubmitPaper = FormSchemaPaper.omit({ paper_id: true, date: true });
 
export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function submitPaper(formData: FormData) {
  const user_id = (await getUser('hector@simpson.com')).user_id;
  const { title, description, conference_name } = SubmitPaper.parse({
    title: formData.get('title'),
    description: formData.get('description'),
    conference_name: formData.get('conference_name')
  });
  const date = new Date().toISOString().split('T')[0];
  const paperID = randomInt(10000);

  const conference_id = conference_name;

  await sql`
    INSERT INTO paper (paper_id, paper_title, submission_date, conference_id)
    VALUES (${paperID}, ${title}, ${date}, ${conference_id})
  `;

  await sql`
    INSERT INTO paper_author_link (author_user_id, paper_id)
    VALUES (${user_id}, ${paperID})
  `

  revalidatePath('/dashboard/conferences');
  redirect('/dashboard/conferences');
}
 
export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
 
  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}