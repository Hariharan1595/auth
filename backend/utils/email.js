import { WELCOME_EMAIL_TEMPLATE } from "./emailTemplates.js";
import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
	VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";
import transporter from "./nodeMailer.js";

export const sendVerificationEmail = async (email, verificationToken) => {
	const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: "Email Verification",
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
    };

    try {
        const response = await transporter.sendMail(mailOptions);

        console.log("Verification email sent successfully");
    } catch (error) {
        console.error(`Error sending verification email`, error);

        throw new Error(`Error sending verification email: ${error}`);
    }
};

export const sendWelcomeEmail = async (email, name) => {
	const mailOptions = {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: "Welcome to Our App",
        html: WELCOME_EMAIL_TEMPLATE(name),
    };

    try {
        const response = await transporter.sendMail(mailOptions);

        console.log("Welcome email sent successfully");
    } catch (error) {
        console.error(`Error sending welcome email`, error);

        throw new Error(`Error sending welcome email: ${error}`);
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
	const mailOptions = {
		from: process.env.FROM_EMAIL,
		to: email,
		subject: "Password Reset",
		html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
	};

	try {
		const response = await transporter.sendMail(mailOptions);

		console.log("Password reset email sent successfully");
	} catch (error) {
		console.error(`Error sending password reset email`, error);

		throw new Error(`Error sending password reset email: ${error}`);
	}
};

export const sendResetSuccessEmail = async (email) => {
	const mailOptions = {
		from: process.env.FROM_EMAIL,
		to: email,
		subject: "Password Reset Successful",
		html: PASSWORD_RESET_SUCCESS_TEMPLATE,
	};

	try {
		const response = await transporter.sendMail(mailOptions);

		console.log("Password reset success email sent successfully");
	} catch (error) {
		console.error(`Error sending password reset success email`, error);

		throw new Error(`Error sending password reset success email: ${error}`);
	}
};