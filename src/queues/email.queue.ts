import Bull from 'bull';
import emailProcess from '../processes/email.process';
import {BullAdapter} from '@bull-board/api/bullAdapter';
import {createBullBoard} from '@bull-board/api';
import {ExpressAdapter} from '@bull-board/express';

// https://optimalbits.github.io/bull

const emailQueue = new Bull('email', {
    redis: {port: 6379, host: 'localhost'}
});

const serverAdapter = new ExpressAdapter();
createBullBoard({
    queues: [new BullAdapter(emailQueue)],
    serverAdapter
})
emailQueue.process(emailProcess);

const sendNewEmail = (queue: Bull.Queue, data: any) => {
    queue.add(data, {
        attempts: 5
    });
};

export {
    sendNewEmail
}
