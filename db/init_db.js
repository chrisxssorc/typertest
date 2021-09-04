const client = require('./client');

async function buildTables() {
    try {
        client.connect();

        //drop tables
        console.log('Starting to DROP TABLES...');
        await client.query(
            `
            DROP TABLE IF EXISTS passages;
            `)
        console.log('Successfully DROPPED TABLES!');

        //build tables
        console.log('Attempting to CREATE TABLES...');
        await client.query(
            `
            CREATE TABLE passages(
                id SERIAL PRIMARY KEY,
                author VARCHAR(255),
                title VARCHAR(255),
                passage TEXT NOT NULL
            );
            `);
        console.log('Successfully CREATED TABLES!');
    } catch (error) {
        throw error;
    }
}

async function populateInitialPassages() {
    console.log('Trying to create passages...')
    try {
        const passagesToCreate = [
            {
                author: '',
                title: '',
                passage: ''
            }
        ];

        const passages = await Promise.all(passagesToCreate.map(createPassage));

        console.log('Passages Created: ', passages);
        console.log('Finished creating passages!');
    } catch (error) {
        throw error;
    }
}

buildTables()
    .then(populateInitialPassages)
    .catch(console.error)
    .finally(() => client.end());
