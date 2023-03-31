const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { googleConfig } = require('../config/app-config');

// These id's and secrets should come from .env file.
const CLIENT_ID = googleConfig.CLIENT_ID;
const CLEINT_SECRET = googleConfig.CLIENT_SECRET;
const REDIRECT_URI = googleConfig.REDIRECT_URIS[0];
const REFRESH_TOKEN = googleConfig.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async (payload) => {
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: googleConfig.SENDER_EMAIL,
                clientId: CLIENT_ID,
                clientSecret: CLEINT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: googleConfig.SENDER_EMAIL,
            to: payload.to,
            subject: payload.subject,
            text: payload.text,
            html: payload.html,
        };

        const result = await transport.sendMail(mailOptions);
        return result
    } catch (error) {
        return error
    }
}

module.exports = {
    sendMail
};
