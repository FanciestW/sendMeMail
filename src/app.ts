const sgMail = require('@sendgrid/mail');
const { validateCaptchaToken } = require('./utils/captcha');
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

        // Validate reCAPTCHA token.
        if (!await validateCaptchaToken(body.captcha)) {
            return {
                statusCode: 400,
                headers: header,
                body: JSON.stringify({
                    message: 'reCAPTCHA Failed, please try again.',
                }),
            };
        }

        const message = body.message || '';
        const senderEmail = body.email || '';
        const senderName = body.name || '';
        const emailData = {
            to: 'wlin26@yahoo.com',
            from: senderEmail,
            subject: `SendMeMail: Message from ${senderName}`,
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
