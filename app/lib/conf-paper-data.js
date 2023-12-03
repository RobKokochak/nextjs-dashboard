const { randomUUID } = require("crypto");

const conference = [
  {
    conference_id: '1',
    name: 'InfoSys Conference',
    location_id: '4',
    start_date: '2023-12-25',
    end_date: '2023-12-30',
    conference_chair_user_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a'
  },
  {
    conference_id: '2',
    name: 'AI Conference',
    location_id: '3',
    start_date: '2024-1-10',
    end_date: '2024-1-17',
    conference_chair_user_id: '50ca3e18-62cd-11ee-8c99-0242ac120002'
  },
  {
    conference_id: '3',
    name: 'Web Development Conference',
    location_id: '2',
    start_date: '2023-12-15',
    end_date: '2023-12-25',
    conference_chair_user_id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9'
  },
  {
    conference_id: '4',
    name: 'Audio Programming Conference',
    location_id: '1',
    start_date: '2023-12-2',
    end_date: '2023-12-10',
    conference_chair_user_id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB'
  },
];

const conference_location = [
  {
    location_id: '1',
    city: 'Dearborn',
    state: 'MI',
    country: 'USA'
  },
  {
    location_id: '2',
    city: 'Miami',
    state: 'FL',
    country: 'USA'
  },
  {
    location_id: '3',
    city: 'Los Angeles',
    state: 'CA',
    country: 'USA'
  },
  {
    location_id: '4',
    city: 'New York City',
    state: 'NY',
    country: 'USA'
  },
];

const user = [
  {
    user_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    email: 'delba@oliveira.com',
    password: '123456',
    fname: 'Delba',
    lname: 'de Oliveira',
    user_title: 'professor',
    user_affiliation: 'UofM'
  },
  {
    user_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    email: 'lee@robinson.com',
    password: '123456',
    fname: 'Lee',
    lname: 'Robinson',
    user_title: 'researcher',
    user_affiliation: 'UofM'
  },
  {
    user_id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    email: 'hector@simpson.com',
    password: '123456',
    fname: 'Hector',
    lname: 'Simpson',
    user_title: 'student',
    user_affiliation: 'UofM'
  },
  {
    user_id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    email: 'steven@tey.com',
    password: '123456',
    fname: 'Steven',
    lname: 'Tey',
    user_title: 'fellow',
    user_affiliation: 'UofM'
  },
  {
    user_id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    email: 'steph@dietz.com',
    password: '123456',
    fname: 'Steph',
    lname: 'Dietz',
    user_title: 'professor',
    user_affiliation: 'MSU'
  },
  {
    user_id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    email: 'michael@novotny.com',
    password: '123456',
    fname: 'Michael',
    lname: 'Novotny',
    user_title: 'researcher',
    user_affiliation: 'MSU'
  },
  {
    user_id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    email: 'emil@kowalski.com',
    password: '123456',
    fname: 'Emil',
    lname: 'Kowalski',
    user_title: 'student',
    user_affiliation: 'WSU'
  },
  {
    user_id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    email: 'amy@burns.com',
    password: '123456',
    fname: 'Amy',
    lname: 'Burns',
    user_title: 'professor',
    user_affiliation: 'WSU'
  },
  {
    user_id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    email: 'balazs@orban.com',
    password: '123456',
    fname: 'Balazs',
    lname: 'Orban',
    user_title: 'dean',
    user_affiliation: 'WSU'
  },
];

const role = [
  {
    role_id: '1',
    role_name: 'author',
  },
  {
    role_id: '2',
    role_name: 'reviewer',
  },
  {
    role_id: '3',
    role_name: 'chair',
  },
];

const user_role_link = [
  {
    user_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    role_id: '3'
  },
  {
    user_id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
    role_id: '3'
  },
  {
    user_id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    role_id: '3'
  },
  {
    user_id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    role_id: '3'
  },
  {
    user_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    role_id: '1'
  },
  {
    user_id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    role_id: '1'
  },
  {
    user_id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
    role_id: '1'
  },
  {
    user_id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    role_id: '1'
  },
  {
    user_id: '126eed9c-c90c-4ef6-a4a8-fcf7408d3c66',
    role_id: '1'
  },
  {
    user_id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    role_id: '1'
  },
  {
    user_id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    role_id: '1'
  },
];

const paper = [
  {
    paper_id: '1',
    paper_title: 'Information Systems',
    submission_date: '2023-12-1',
    conference_id: '1',
  },
];

const paper_author_link = [
  {
    author_user_id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    paper_id: '1'
  },
];

const paper_reviewer_link = [
  {

  },
];

module.exports = {
  conference,
  conference_location,
  user,
  role,
  user_role_link,
  paper,
  paper_author_link,
  paper_reviewer_link
};
