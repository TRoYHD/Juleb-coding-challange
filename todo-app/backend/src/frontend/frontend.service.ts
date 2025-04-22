// src/frontend/frontend.service.ts
import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class FrontendService {
  getSpaFilePath(): string {
    return join(__dirname, '..', '..', 'public', 'index.html');
  }
}