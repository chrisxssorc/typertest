const client = require('./client');

const createPassage = async ({author, title, excerpt}) => {
    try {
        const { rows: [passage] } = await client.query(
            `
            INSERT INTO passages(author, title, excerpt)
            VALUES($1, $2, $3)
            RETURNING *;
            `,
            [author, title, excerpt]
        );

        return passage;
    } catch (error) {
        throw error;
    }
}

const getAllPassages = async () => {
    try {
        const { rows } = await client.query(
            `
            SELECT *
            FROM passages
            `
        );

        return rows;
    } catch (error) {
        throw error;
    }
}

const getPassageById = async (id) => {
    try {
        const { rows: [passage] } = await client.query(
            `
            SELECT *
            FROM passages
            WHERE id=$1;
            `, [id]
        );

        return passage;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createPassage,
    getAllPassages,
    getPassageById
};