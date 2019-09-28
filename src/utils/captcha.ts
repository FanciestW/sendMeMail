import axios from 'axios';

const secret = process.env.CAPTCHA_SECRET_KEY;

/**
 * Validates with Google reCAPTCHA if a reCAPTCHA token is valid.
 * @param token The reCAPTCHA token to be validated.
 * @param remoteip The remote IP where the token was sent from.
 * @returns true if valid and false otherwise.
 */
export async function validateCaptchaToken(token: string, remoteip=null) {
    const response = await axios({
        method: 'post',
        url: 'https://www.google.com/recaptcha/api/siteverify',
        params: {
            secret,
            response: token,
            remoteip,
        },
    });
    return response.data.success;
}
