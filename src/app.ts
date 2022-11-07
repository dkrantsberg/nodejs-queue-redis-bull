import express from 'express';
import bodyParser from 'body-parser';
import {ExpressAdapter} from '@bull-board/express';
import Bull from 'bull';
import {createBullBoard} from '@bull-board/api';
import {BullAdapter} from '@bull-board/api/bullAdapter';
import emailProcess from './processes/email.process';
import {sendNewEmail} from './queues/email.queue';

const app = express();

app.use(bodyParser.json());

const bullBoardPath = '/admin/queues'
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath(bullBoardPath);


const emailQueue = new Bull('email', {
    redis: {port: 6379, host: 'localhost'}});

createBullBoard({
    queues: [new BullAdapter(emailQueue)],
    serverAdapter
})
emailQueue.process(1, emailProcess);

app.use(bullBoardPath, serverAdapter.getRouter());


app.post('/send-email', async (req, res) => {
    const {message, ...restBody} = req.body;
    await sendNewEmail(emailQueue, {
        ...restBody,
        html: `<p>${message}</p>`
    });
    res.send({status: 'ok'});
});

app.get('/', async (req, res) => {
    res.send('Hello world');
});

app.listen(5000, () => console.log('App running on port 5000'));



