import { env } from "@/env";
import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import { ReactElement } from "react";

const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASSWORD,
    },
});

interface SendEmailArgs {
    to: string;
    subject: string;
    react: ReactElement;
    from?: string;
}

export async function sendEmail({ to, subject, react, from }: SendEmailArgs) {
    try {
        const html = await render(react);
        const options = {
            from: from || env.FROM_EMAIL_ADDRESS,
            to,
            subject,
            html,
        };
        const info = await transporter.sendMail(options);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
}
