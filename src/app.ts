import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);
console.log(process.env.SENDGRID_KEY);

export const email: APIGatewayProxyHandler = async (event, _context) => {
	const body = JSON.parse(event.body);
	const message = body.message || '';
	const senderEmail = body.email || '';
	console.log(`${senderEmail}\n${message}`);
	const email = {
		to: 'wlin26@yahoo.com',
		from: senderEmail,
		subject: `SendMeMail`,
		text: message
	};
	sgMail.send(email);
	return {
		statusCode: 200,
		body: JSON.stringify({
			message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!'
		}, null, 2),
	};
}
