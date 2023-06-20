import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Events } from './events';
import { InitResetPasswordEvent } from './dto/init-reset-password.event';
import { ControlMusicEvent } from './dto/control-music.event';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EventHandler {
  constructor(
    private mailClient: MailerService,
    @Inject('RABBITMQ_SERVICE2') private client: ClientProxy,
  ) {}

  @OnEvent(Events.INIT_RESET_PASSWORD)
  sendOtpToUser(payload: InitResetPasswordEvent) {
    this.mailClient.sendMail({
      to: payload.email,
      from: 'noreply@gmail.com',
      subject: 'Reset password OTP',
      html: `<b>${payload.otp}</b>`,
    });
  }

  @OnEvent(Events.CONTROL_MUSIC)
  sendController(payload: ControlMusicEvent) {
    const data = JSON.stringify(payload);
    console.log(data);
    const time = Date.now();
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setTimeout(() => {}, 2000);
    this.client.emit({ cmd: time }, payload);
    console.log(time);
  }
}
