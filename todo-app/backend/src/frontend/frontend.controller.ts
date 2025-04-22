import { Controller, Get, Res, All } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class FrontendController {
  @Get('/')
  serveRoot(@Res() res: Response) {
    console.log('Serving frontend root');
    return res.sendFile(join('/app/public/index.html'));
  }
  
  @Get('*')
  serveWildcard(@Res() res: Response) {
    console.log('Serving frontend wildcard route');
    return res.sendFile(join('/app/public/index.html'));
  }
}