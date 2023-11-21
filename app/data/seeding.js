const { fakerFR } = require('@faker-js/faker');
const client = require('../dataMappers/database');
const NB_USERS = 50;
const NB_PROJECTS = 20;
const faker = fakerFR;
const tags = ['Java', 'Javascript', 'HTML', 'CSS', 'React', 'SQL', 'Python', 'C',
 'C++', 'PHP', 'Go', 'Jest', 'Joi', 'COBOL', 'GraphQL', 'Faker', 'TypeScript', 'Bootstrap', 'Angular', 'Rust'];

async function restartDB() {
  await client.query('TRUNCATE "user", "project", "tag", "project_has_tag", "user_has_tag", "project_has_user" RESTART IDENTITY CASCADE;');
  return
};

function generateUser(nbUsers) {
  const users = [];
  for (let i = 0; i < nbUsers; i++) {
    const user = {
      lastname: faker.person.lastName(),
      firstname: faker.person.firstName(),
      pseudo: faker.internet.userName(),
      email: faker.internet.email(),
      password: '$2b$10$3i3kHi8MZDpmLW1icHax5u69KOvYOgIWkFkz1dKgKOlE64sRQCRZ.',
      description: faker.person.bio(),
      picture: faker.image.avatar(),
      availability: faker.datatype.boolean(),
    };
    users.push(user);
  }
  return users;
}

async function insertUsers(users) {
  const usersValues = users.map((user) => `(
    '${user.lastname}',
    '${user.firstname}',
    '${user.email}',
    '${user.pseudo}',
    '${user.password}',
    '${user.description}',
    '${user.picture}',
    '${user.availability}'    
  )`);

  const queryStr = `
    INSERT INTO "user"
    (
      "lastname",
      "firstname",
      "email",
      "pseudo",
      "password",
      "description",
      "picture",
      "availability"
    )
    VALUES
    ${usersValues}
    RETURNING id
  `;
  const result = await client.query(queryStr);
  return result.rows;
}

function generateProject(nbProjects) { 
  const projects = [];
  for (let i = 0; i < nbProjects; i++) {
    const project = {
      title: faker.commerce.productName(),
      description: faker.company.buzzPhrase(),
      availability: faker.datatype.boolean(),
      user_id: faker.number.int({min: 1, max: NB_USERS})
    };
    projects.push(project);
  }
  return projects;
}

async function insertProjects(projects) {
  const projectsValues = projects.map((project) => `(
    '${project.title}',
    '${project.description}',
    '${project.availability}',
    '${project.user_id}'    
  )`);

  const queryStr = `
    INSERT INTO "project"
    (
      "title",
      "description",
      "availability",
      "user_id"
    )
    VALUES
    ${projectsValues}
    RETURNING id
    `;
  const result = await client.query(queryStr);
  
  const projects_have_users = []
    for (i = 0; i< projectsValues.length; i++){
      const project = projects[i];
      const project_has_user = {
        project_id: i + 1,
        user_id: project.user_id,
        is_active: true
      }
      projects_have_users.push(project_has_user);
    }
  insertProject_has_user(projects_have_users);

  return result.rows;
}

async function insertTags(tags) {
  const queryStr = `
    INSERT INTO "tags"
      (
        "name"
      )
      VALUES
      ${tags}
      RETURNING id
    `;
  const result = await client.query(queryStr);
  return result.rows;
}

function generateProject_has_user() { 
  const projects_have_users = [];
  for (let i = 1; i <= NB_PROJECTS; i++) {
    // value max = peut etre modifie pour le nbr max 'user dans la relation par projet
    const randomNbUser = faker.number.int({max: 6});
    for (let y = 0; y < randomNbUser; y++) {
      const project_has_user = {
        project_id: i,
        user_id: faker.number.int({min: 1, max: NB_USERS}),
        is_active: faker.datatype.boolean()
      }
      projects_have_users.push(project_has_user);
    }
  }
  return projects_have_users;
}

async function insertProject_has_user(project_has_user) {
  const p_h_uValues = project_has_user.map((p_h_u) => `(
    '${p_h_u.project_id}',
    '${p_h_u.user_id}',
    '${p_h_u.is_active}'  
  )`);
  const queryStr = `
  INSERT INTO "project_has_user"
    (
      "project_id",
      "user_id",
      "is_active"
    )
    VALUES
    ${p_h_uValues}
    RETURNING id
  `;
  const result = await client.query(queryStr);
  return result.rows;
}

async function insertTags() {
  const mappedTags = tags.map((tag) => `(
    '${tag}' 
  )`);
  const queryStr = `
  INSERT INTO "tag"
    (
      "name"
    )
    VALUES
    ${mappedTags}
    RETURNING id
  `;
  const result = await client.query(queryStr);
  return result.rows;
}

function generate_has_tag(nbrToBeTagged) { 
  const have_users = [];
  for (let i = 1; i <= nbrToBeTagged; i++) {
    // value max = peut etre modifie pour le nbr max 'user dans la relation par projet
    const randomNbTag = faker.number.int({max: 5});
    for (let y = 0; y < randomNbTag; y++) {
      const has_user = {
        fk_id1: i,
        fk_id2: faker.number.int({min: 1, max: tags.length})
      }
      have_users.push(has_user);
    }
  }
  return have_users;
}

async function insert_has_tag(has_tag, who) {
  const hasTagValues = has_tag.map((hasTag) => `(
    '${hasTag.fk_id1}',
    '${hasTag.fk_id2}'
  )`);
  const queryStr = `
  INSERT INTO "${who}_has_tag"
    (
      "${who}_id",
      "tag_id"
    )
    VALUES
    ${hasTagValues}
    RETURNING id
  `;
  const result = await client.query(queryStr);
  return result.rows;
}

console.log('Erasing previous DB')
restartDB();

setTimeout(() => {
  const users = generateUser(NB_USERS);
  insertUsers(users);
  console.log('Creating users');
}, 3000);

setTimeout(() => {
  const projects = generateProject(NB_PROJECTS);
  insertProjects(projects);
  console.log('Creating projects');
}, 6000);

setTimeout(() => {
  const projectUser = generateProject_has_user();
  insertProject_has_user(projectUser);
  console.log('Creating users - projects relations');
}, 9000);

setTimeout(() => {
  insertTags();
  console.log('Adding Tags');
}, 12000);

setTimeout(() => {
  const projects_tags = generate_has_tag(NB_PROJECTS);
  insert_has_tag(projects_tags, 'project');
  console.log('Creating tags - projects relations');
}, 15000);

setTimeout(() => {
  const users_tags = generate_has_tag(NB_USERS);
  insert_has_tag(users_tags, 'user');
  console.log('Creating users - tags relations');
}, 18000);

setTimeout(() => {
  console.log('All done');
}, 20000);

setTimeout(() => {
  process.exit();
}, 21000);
