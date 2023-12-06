import { sql } from '@vercel/postgres';
import { User, Conference } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { late } from 'zod';

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
    const userRoleLinkPromise = sql`SELECT 
        * FROM user_role_link
        WHERE User_id = ${user.user_id}`;
    const conferenceCountPromise = sql`SELECT COUNT(*) FROM conference`;
    const paperCountPromise = sql`SELECT COUNT(*) FROM paper_author_link WHERE author_user_id = ${user.user_id}`;

    const data = await Promise.all([
      userRoleLinkPromise,
      conferenceCountPromise,
      paperCountPromise,
    ]);

    let userRole = '';
    for (let i = 0; i < data[0].rows.length; i++) {
      let role = ''
      if (data[0].rows[i].role_id == '1') role = 'Author';
      else if (data[0].rows[i].role_id == '2') role = 'Reviewer';
      else role = 'Conference Chair';
      userRole += role + ', ';
    }
    // Remove the trailing comma and space
    userRole = userRole.slice(0, -2);
    const numberOfConferences = Number(data[1].rows[0].count ?? '0');
    const numberOfPapers = Number(data[2].rows[0].count ?? '0');

    return {
      userRole,
      numberOfConferences,
      numberOfPapers
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredConferences(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const conferences = await sql<Conference>`
      SELECT *
      FROM conference
      WHERE conference.name ILIKE ${`%${query}%`} 
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return conferences.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch filtered conferences.');
  }
}

export async function fetchConferencesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT *
    FROM conference
    JOIN uuser ON conference.conference_chair_user_id = user.user_id
    WHERE
      uuser.fname ILIKE ${`%${query}%`} OR
      uuser.lname ILIKE ${`%${query}%`} OR
      conference.name ILIKE ${`%${query}%`};
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of conferences.');
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

export async function getConferenceIdByName(name: string) {
  try {
    console.log(name);
    const conference = await sql`SELECT * FROM conference WHERE name=${name}`;
    return conference.rows[0].conference_id;
  } catch (error) {
    console.error('Failed to fetch conference id:', error);
    throw new Error('Failed to fetch conference id.');
  }
}

export async function getConferences() {
  try {
    const conferences = await sql`SELECT * FROM conference`;
    return conferences.rows as Conference[];
  } catch (error) {
    console.error('Failed to fetch conference:', error);
    throw new Error('Failed to fetch conferences.');
  }
}
