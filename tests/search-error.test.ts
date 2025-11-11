import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import request from 'supertest';
import app from '../src/app';
import { Server } from 'http';

// Mock the search service to throw errors when called
vi.mock('../src/services/searchService', () => ({
  default: {
    search: vi.fn(() => {
      throw new Error('Simulated search service error');
    }),
  },
}));

describe('Search Route Error Handling', () => {
  let server: Server;

  beforeAll(() => {
    server = app.listen(0);
  });

  afterAll(() => {
    server.close();
  });

  it('should handle search service errors and return 500', async () => {
    const response = await request(app).get('/search/oslo');

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty(
      'error',
      'Simulated search service error'
    );
    expect(response.body).toHaveProperty(
      'message',
      'Internal server error occurred'
    );
  });
});
