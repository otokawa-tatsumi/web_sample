import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import * as crypto from 'crypto';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ランダムなシークレットを生成
  const sessionSecret = crypto.randomBytes(32).toString('hex');

  app.use(
    session({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(8080);
}
bootstrap();
