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
      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
      expect(response.body).toHaveProperty('environment');
    });
  });

  describe('GET /search', () => {
    it('should return 404 for empty search', async () => {
      const response = await request(app).get('/search');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for short search query', async () => {
      const response = await request(app).get('/search/ab');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('at least 3 characters');
    });

    it('should return search results for valid query', async () => {
      const response = await request(app).get('/search/oslo');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('results');
      expect(response.body).toHaveProperty('query', 'oslo');
      expect(response.body).toHaveProperty('total');
      expect(Array.isArray(response.body.results)).toBe(true);
    });

    it('should return empty array when no results found', async () => {
      const response = await request(app).get('/search/kdfhdskjfhsj');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('results');
      expect(response.body).toHaveProperty('query', 'kdfhdskjfhsj');
      expect(response.body).toHaveProperty('total');
      expect(response.body.results).toHaveLength(0);
    });
  });

  describe('GET /nonexistent', () => {
    it('should return 404 for nonexistent route', async () => {
      const response = await request(app).get('/nonexistent');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Endpoint not found');
    });
  });
});
