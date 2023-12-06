// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  user_id: string;
  email: string;
  password: string;
  fname: string;
  lname: string;
  user_title: string;
  user_affiliation: string;
};

export type Conference = {
  conference_id: string;
  name: string;
  location_id: string;
  start_date: string;
  end_date: string;
  conference_chair_user_id: string;
  submission_deadline: string;
}
