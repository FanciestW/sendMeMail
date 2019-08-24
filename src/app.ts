const sgMail = require('@sendgrid/mail');
import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
sgMail.setApiKey(process.env.SENDGRID_KEY);

export const email: APIGatewayProxyHandler = async (event, _context) => {
    try {
        const header = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        };
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
                headers: header,
                body: JSON.stringify({
                    message: 'Mail Sent!',
                }, null, 2),
            };
        }, (err: any) => {
            return {
                statusCode: 500,
                headers: header,
                body: JSON.stringify({
                    message: 'Message Failed to Send',
                    error: err,
                }),
            };
        });
    } catch (err) {
        const header = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        };
        if (err instanceof TypeError) {
            return {
                statusCode: 400,
                headers: header,
                body: JSON.stringify({
                    message: 'Request caused TypeError',
                    error: err,
                }),
            };
        }
        return {
            statusCode: 500,
            headers: header,
            body: JSON.stringify({
                message: 'Error Occurred',
                error: err,
            }),
        };
    }
};
