import { describe, it, expect } from 'vitest';
import searchService from '../src/services/searchService';

describe('SearchService', () => {
  describe('search', () => {
    it('should return empty results for non-matching query', () => {
      const results = searchService.search('nonexistentcity123', 10);
      expect(results).toHaveLength(0);
    });

    it('should find addresses by city name', () => {
      const results = searchService.search('oslo', 10);
      expect(results.length).toBeGreaterThan(0);

      // Check that results contain Oslo addresses
      const osloResults = results.filter(addr =>
        addr.city.toLowerCase().includes('oslo')
      );
      expect(osloResults.length).toBeGreaterThan(0);
    });

    it('should find addresses by street name', () => {
      const results = searchService.search('rodeløkka', 10);
      expect(results.length).toBeGreaterThan(0);
      // Check that results contain the street
      const streetResults = results.filter(addr =>
        addr.street.toLowerCase().includes('rodeløkka')
      );
      expect(streetResults.length).toBeGreaterThan(0);
    });

    it('should limit results when specified', () => {
      const limitedResults = searchService.search('o', 5);
      expect(limitedResults.length).toBeLessThanOrEqual(5);
    });
  });

  describe('getStats', () => {
    it('should return statistics about the dataset', () => {
      const stats = searchService.getStats();
      expect(stats).toHaveProperty('totalAddresses');
      expect(typeof stats.totalAddresses).toBe('number');
      expect(stats.totalAddresses).toBeGreaterThan(0);
    });
  });
});
