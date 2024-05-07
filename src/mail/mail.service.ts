import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailDto } from './dto/mail.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMailUser(user: MailDto) {
    const url = `${process.env.API_HOST}:${process.env.PORT}/api/auth/user/activate/${user.activation_link}`;
    console.log(url);
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Furniture App! Comformation your email',
      template: './confirmation',
      context: {
        full_name: user.full_name,
        url,
      },
    });
  }
}
