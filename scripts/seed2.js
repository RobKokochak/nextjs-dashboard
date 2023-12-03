const { db } = require('@vercel/postgres');
const {
  user,
  conference,
  conference_location,
  role,
  user_role_link,
  paper,
  paper_author_link,
  paper_reviewer_link
} = require('../app/lib/conf-paper-data.js');
const bcrypt = require('bcrypt');

async function seedConference(client) {
  try {
    // Create the "conference" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS conference (
        conference_id INT PRIMARY KEY,
        name TEXT NOT NULL,
        location_id INT,
        start_date DATE,
        end_date DATE,
        conference_chair_user_id UUID
      );
    `;

    console.log(`Created "conference" table`);

    // Insert data into the "conference" table
    const insertedConferences = await Promise.all(
      conference.map(
        (conference) => client.sql`
        INSERT INTO conference (conference_id, name, location_id, start_date, end_date, conference_chair_user_id)
        VALUES (${conference.conference_id}, ${conference.name}, ${conference.location_id}, ${conference.start_date}, ${conference.end_date}, ${conference.conference_chair_user_id})
        ON CONFLICT (conference_id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedConferences.length} conferences`);

    return {
      createTable,
      conferences: insertedConferences,
    };
  } catch (error) {
    console.error('Error seeding conferences:', error);
    throw error;
  }
}

async function seedConferenceLocation(client) {
  try {
    // Create the "conference_location" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS conference_location (
        location_id INT PRIMARY KEY,
        city TEXT NOT NULL,
        state TEXT,
        country TEXT
      );
    `;

    console.log(`Created "conference_location" table`);

    const insertedConferenceLocations = await Promise.all(
      conference_location.map(
        (location) => client.sql`
        INSERT INTO conference_location (location_id, city, state, country)
        VALUES (${location.location_id}, ${location.city}, ${location.state}, ${location.country})
        ON CONFLICT (location_id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedConferenceLocations.length} locations`);

    return {
      createTable,
      conferences: insertedConferenceLocations,
    };
  } catch (error) {
    console.error('Error seeding locations:', error);
    throw error;
  }
}

async function seedUser(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    console.log('test22222');
    // Create the "user" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS uuser (
        user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        email TEXT NOT NULL, 
        password TEXT NOT NULL, 
        fname TEXT NOT NULL, 
        lname TEXT NOT NULL, 
        user_title TEXT, 
        user_affiliation TEXT
      );
    `;

    console.log(`Created "user" table`);

    // Insert data into the "user" table
    const insertedUsers = await Promise.all(
      user.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO uuser (user_id, email, password, fname, lname, user_title, user_affiliation)
        VALUES (${user.user_id}, ${user.email}, ${hashedPassword}, ${user.fname}, ${user.lname}, ${user.user_title}, ${user.user_affiliation})
        ON CONFLICT (user_id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedRole(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS role (
        role_id INT PRIMARY KEY,
        role_name TEXT NOT NULL
      );
    `;

    console.log(`Created "role" table`);

    const insertedRoles = await Promise.all(
      role.map((role) => client.sql`
        INSERT INTO role (role_id, role_name)
        VALUES (${role.role_id}, ${role.role_name})
        ON CONFLICT (role_id) DO NOTHING;
      `),
    );

    console.log(`Seeded ${insertedRoles.length} roles`);

    return {
      createTable,
      roles: insertedRoles,
    };
  } catch (error) {
    console.error('Error seeding roles:', error);
    throw error;
  }
}

async function seedUserRoleLink(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS user_role_link (
        user_id UUID,
        role_id INT,
        PRIMARY KEY(user_id, role_id)
      );
    `;

    console.log(`Created "user_role_link" table`);

    const insertedUserRoleLinks = await Promise.all(
      user_role_link.map((link) => client.sql`
        INSERT INTO user_role_link (user_id, role_id)
        VALUES (${link.user_id}, ${link.role_id})
        ON CONFLICT (user_id, role_id) DO NOTHING;
      `),
    );

    console.log(`Seeded ${insertedUserRoleLinks.length} user-role links`);

    return {
      createTable,
      links: insertedUserRoleLinks,
    };
  } catch (error) {
    console.error('Error seeding user-role links:', error);
    throw error;
  }
}

async function seedPaper(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS paper (
        paper_id INT PRIMARY KEY,
        paper_title TEXT NOT NULL,
        submission_date DATE,
        conference_id INT,
        generated_recommendation TEXT DEFAULT 'pending',
        paper_status TEXT DEFAULT 'pending'
      );
    `;
    
    console.log(`Created "paper" table`);

    const insertedPapers = await Promise.all(
      paper.map((paper) => client.sql`
        INSERT INTO paper (paper_id, paper_title, submission_date, conference_id, generated_recommendation, paper_status)
        VALUES (${paper.paper_id}, ${paper.paper_title}, ${paper.submission_date}, ${paper.conference_id}, ${paper.generated_recommendation}, ${paper.paper_status})
        ON CONFLICT (paper_id) DO NOTHING;
      `),
    );

    console.log(`Seeded ${insertedPapers.length} papers`);

    return {
      createTable,
      papers: insertedPapers,
    };
  } catch (error) {
    console.error('Error seeding papers:', error);
    throw error;
  }
}

async function seedPaperAuthorLink(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS paper_author_link (
        author_user_id UUID,
        paper_id INT,
        PRIMARY KEY(author_user_id, paper_id)
      );
    `;

    console.log(`Created "paper_author_link" table`);

    const insertedPaperAuthorLinks = await Promise.all(
      paper_author_link.map((link) => client.sql`
        INSERT INTO paper_author_link (author_user_id, paper_id)
        VALUES (${link.author_user_id}, ${link.paper_id})
        ON CONFLICT (author_user_id, paper_id) DO NOTHING;
      `),
    );

    console.log(`Seeded ${insertedPaperAuthorLinks.length} paper-author links`);

    return {
      createTable,
      links: insertedPaperAuthorLinks,
    };
  } catch (error) {
    console.error('Error seeding paper-author links:', error);
    throw error;
  }
}

async function seedPaperReviewerLink(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS paper_reviewer_link (
        reviewer_user_id UUID,
        paper_id INT,
        PRIMARY KEY(reviewer_user_id, paper_id)
      );
    `;

    console.log(`Created "paper_reviewer_link" table`);

    const insertedPaperReviewerLinks = await Promise.all(
      paper_reviewer_link.map((link) => client.sql`
        INSERT INTO paper_reviewer_link (reviewer_user_id, paper_id)
        VALUES (${link.reviewer_user_id}, ${link.paper_id})
        ON CONFLICT (reviewer_user_id, paper_id) DO NOTHING;
      `),
    );

    console.log(`Seeded ${insertedPaperReviewerLinks.length} paper-reviewer links`);

    return {
      createTable,
      links: insertedPaperReviewerLinks,
    };
  } catch (error) {
    console.error('Error seeding paper-reviewer links:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedConference(client);
  await seedConferenceLocation(client);
  await seedUser(client);
  await seedRole(client);
  await seedUserRoleLink(client);
  await seedPaper(client);
  await seedPaperAuthorLink(client);
  await seedPaperReviewerLink(client);

  await client.end();
}

main().catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err);
});