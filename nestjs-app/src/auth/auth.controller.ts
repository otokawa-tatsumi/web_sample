import { Controller, Request, Post, UseGuards, Res } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { Response } from 'express';

@Controller()
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    res.send('Login successful');
  }

  @Post('logout')
  async logout(@Request() req, @Res() res: Response) {
    req.logout((err) => {
      if (err) {
        return res.status(401).send('Login failed');
      }
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).send('Session destruction failed');
        }
        res.setHeader('Content-Type', 'text/plain');
        res.send('Logout successful');
      });
    });
  }
}
