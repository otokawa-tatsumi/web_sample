import { Injectable } from '@nestjs/common';

@Injectable()
export class MainService {
  getWelcomeMessage(): { message: string } {
    return { message: 'Welcome, you are authenticated.' };
  }
}
