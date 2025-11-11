import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/app';
import { Server } from 'http';

describe('API Endpoints', () => {
  let server: Server;

  beforeAll(() => {
    server = app.listen(0);
  });

  afterAll(() => {
    server.close();
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data.uptime');
      expect(response.body).toHaveProperty('message', 'Service is healthy');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /search', () => {
    it('should return 404 when no query parameter is provided', async () => {
      const response = await request(app).get('/search');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty(
        'error',
        'No search query provided. Use /search/:query'
      );
      expect(response.body).toHaveProperty(
        'message',
        'Missing required parameter'
      );
      expect(response.body).toHaveProperty('timestamp');
    });

    it('should return 400 for short search query', async () => {
      const response = await request(app).get('/search/ab');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body.error).toContain('at least 3 characters');
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('timestamp');
    });

    it('should return search results for valid query', async () => {
      const response = await request(app).get('/search/oslo');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty(
        'message',
        'Search completed successfully'
      );
      expect(response.body).toHaveProperty('timestamp');
    });

    it('should return empty array when no results found', async () => {
      const response = await request(app).get('/search/kdfhdskjfhsj');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('data', []);
      expect(response.body).toHaveProperty('message', 'No results found');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /nonexistent', () => {
    it('should return 404 for nonexistent route', async () => {
      const response = await request(app).get('/nonexistent');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('success', false);
      expect(response.body).toHaveProperty('error', 'Endpoint not found');
      expect(response.body).toHaveProperty('timestamp');
    });
  });
});
