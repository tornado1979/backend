import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import request from 'supertest';
import app from '../src/app';
import { Server } from 'http';

describe('Health Check Error Handling', () => {
  let server: Server;

  beforeAll(() => {
    server = app.listen(0);
  });

  afterAll(() => {
    server.close();
  });

  it('should handle health check errors and return 503', async () => {
    const originalUptime = process.uptime;
    vi.spyOn(process, 'uptime').mockImplementation(() => {
      throw new Error('Simulated uptime error');
    });

    const response = await request(app).get('/health');

    expect(response.status).toBe(503);
    expect(response.body).toHaveProperty('status', 'error');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty(
      'error',
      'Service temporarily unavailable'
    );

    // Restore original function
    process.uptime = originalUptime;
  });
});
