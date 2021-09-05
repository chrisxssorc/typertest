const apiRouter = require('express').Router();
const passagesRouter = require('./passages');

apiRouter.get('/', (req, res, next) => {
    res.send({
        message: 'API is online!'
    })
})

apiRouter.use('/passages', passagesRouter);

module.exports = apiRouter;