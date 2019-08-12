const sgMail = require('@sendgrid/mail');
import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
sgMail.setApiKey(process.env.SENDGRID_KEY);

export const email: APIGatewayProxyHandler = async (event, _context) => {
    const body = JSON.parse(event.body);
    const message = body.message || '';
    const senderEmail = body.email || '';
    const emailData = {
        to: 'wlin26@yahoo.com',
        from: senderEmail,
        subject: `SendMeMail`,
        text: message,
    };
    return sgMail.send(emailData).then((_result: any) => {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Mail Sent!',
            }, null, 2),
        };
    }, (err: any) => {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Message Failed to Send',
                error: err,
            }),
        };
    });
};
