# How to create Queues using Redis and Node.js | FIFO, LIFO, Delayed, Prioritized and Repeatable Jobs

`docker compose up -d`

`npm i && npom start`


To schedule an email job do `POST localhost:5000/send-email ` 

Payload:
```json
{
    "from": "lisa@example.com",
    "to": "example@example.com",
    "subject": "Hello from Bull",
    "html": "Welcome!"
}
```

Bull Dashboard UI
http://localhost:5000/admin/queues/queue/email




Find full tutorial here 👉 [Youtube](https://youtu.be/b7DJEAJZsG0)

In this video, we learn how to implement a job queue using Redis and Node.js, we are basing this tutorial on the library Bull. For this project, we are going to create a queue system where we can send emails to users. In the end, you'll be capable of understanding how to start creating your own queues for your projects.

Follow me:
https://www.instagram.com/codingvenue/
