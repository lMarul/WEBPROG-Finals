import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  /**
   * GET /api/health
   * Health check endpoint for monitoring
   */
  @Get()
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'guestbook-backend',
      version: '1.0.0',
    };
  }
}
