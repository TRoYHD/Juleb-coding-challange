import { Controller, Get, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class FrontendController {
  @Get('*path')
  serveClient(@Res() res: Response, @Param('path') path: string) {
    return res.sendFile(join(__dirname, '..', 'public', 'index.html'));
  }
}