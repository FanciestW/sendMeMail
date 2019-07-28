import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

export const email: APIGatewayProxyHandler = async (event, _context) => {
	const body = JSON.parse(event.body);
	const message = body.message || '';
	const senderEmail = body.email || '';
	console.log(`${senderEmail}\n${message}`);
	return {
		statusCode: 200,
		body: JSON.stringify({
			message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!'
		}, null, 2),
	};
}
