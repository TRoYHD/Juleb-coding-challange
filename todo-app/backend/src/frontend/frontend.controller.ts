import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { FrontendService } from './frontend.service';

@Controller()
export class FrontendController {
  constructor(private readonly frontendService: FrontendService) {}

  @Get()
  serveRoot(@Res() res: Response) {
    return res.sendFile(this.frontendService.getSpaFilePath());
  }
  
  @Get('todos')
  serveTodos(@Res() res: Response) {
    return res.sendFile(this.frontendService.getSpaFilePath());
  }
  
  @Get('todos/:id')
  serveTodoDetail(@Res() res: Response) {
    return res.sendFile(this.frontendService.getSpaFilePath());
  }
}