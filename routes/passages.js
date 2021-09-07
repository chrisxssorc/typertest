const passagesRouter = require('express').Router();
const {
    createPassage,
    getAllPassages,
    getPassageById
} = require('../db/index');

passagesRouter.get('/', async (req, res, next) => {
    try {
        const passage = await getAllPassages();

        res.send({
            passage: passage
        });
    } catch (error) {
        throw error;
    }
})

passagesRouter.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const passage = await getPassageById(id);

        res.send({
            passage: passage
        });
    } catch (error) {
        throw error;
    }
})

passagesRouter.post('/', async (req, res, next) => {
    const { author, title, excerpt } = req.body;

    try {
        const passage = await createPassage({author, title, excerpt});

        res.send({
            passage: passage
        });
    } catch (error) {
        throw error;
    }
})

module.exports = passagesRouter;