import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import Mail from 'nodemailer/lib/mailer';

class Email {
  private transporter!: Mail;

  public constructor() {
    this.createTransport();
  }

  private createTransport() {
    const transporterOptions: SMTPTransport.Options = {
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    };
    this.transporter = nodemailer.createTransport(transporterOptions);
  }

  public async sendMail(toAddress: string, content: string) {
    try {
      const mailOptions: Mail.Options = {
        from: process.env.MAIL_USER,
        to: toAddress,
        html: content,
      };
      await this.transporter.sendMail(mailOptions);
      return true;
    } catch (err) {
      return false;
    }
  }
}

export default Email;
