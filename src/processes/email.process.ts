import {Job} from "bull";
import nodemailer from "nodemailer";

const emailProcess = async (job: Job) => {

    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    const messageUrls = [];
    // send mail with defined transport object
    for (let i = 0; i < 10; i++) {
        const result = await transporter.sendMail(job.data);
        messageUrls.push(nodemailer.getTestMessageUrl(result))
        timeout(20000);
    }

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    return messageUrls;
};

export default emailProcess;

function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}