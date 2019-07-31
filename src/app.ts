import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);

export const email: APIGatewayProxyHandler = (event, _context) => {
	const body = JSON.parse(event.body);
	const message = body.message || '';
	const senderEmail = body.email || '';
	const email = {
		to: 'wlin26@yahoo.com',
		from: senderEmail,
		subject: `SendMeMail`,
		text: message
	};
	sgMail.send(email).then((_result: any) => {
		return {
			statusCode: 200,
			body: JSON.stringify({
				message: 'Mail Sent!'
			}, null, 2),
		};
	}, (err: any) => {
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: 'Message Failed to Send',
				error: err,
			})
		};
	});
}
