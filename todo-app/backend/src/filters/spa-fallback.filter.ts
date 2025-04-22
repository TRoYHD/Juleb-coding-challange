// src/filters/spa-fallback.filter.ts
import { ExceptionFilter, Catch, NotFoundException, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';

@Catch(NotFoundException)
export class SpaFallbackFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    
    // Skip API routes
    if (request.url.startsWith('/api')) {
      response.status(404).json({
        statusCode: 404,
        message: 'Not Found',
      });
      return;
    }
    
    // Serve the SPA index.html for all other routes
    response.sendFile(join(__dirname, '..', '..', 'public', 'index.html'));
  }
}