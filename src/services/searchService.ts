import TrieSearch from 'trie-search';
import * as fs from 'fs';
import * as path from 'path';
import logger from '../utils/logger';

interface Address {
  city: string;
  county: string;
  district: string;
  municipality: string;
  municipalityNumber: number;
  postNumber: number;
  street: string;
  type: string;
  typeCode: number;
}

class SearchService {
  private trie!: TrieSearch<Address>;
  private addresses: Address[] = [];
  private resLimit = 50;

  constructor() {
    this.initializeTrie();
  }

  private initializeTrie(): void {
    try {
      // Load addresses data
      const dataPath = path.join(__dirname, '../../data/addresses.json');
      const rawData = fs.readFileSync(dataPath, 'utf8');
      this.addresses = JSON.parse(rawData) as Address[];

      // Create trie-search instance with multiple searchable fields
      this.trie = new TrieSearch(['street', 'city', 'municipality', 'county'], {
        min: 3, // minimum characters to start search
        indexField: undefined,
        splitOnRegEx: /\s/g,
      });

      // Add all addresses to the trie
      this.trie.addAll(this.addresses);

      logger.info('Search service initialized', {
        totalAddresses: this.addresses.length,
      });
    } catch (error) {
      logger.error('Failed to initialize search service', { error });
      throw error;
    }
  }

  public search(query: string, limit: number): Address[] {
    try {
      if (!query || query.trim().length === 0) {
        return [];
      }

      const cleanQuery = query.trim();
      logger.debug('Performing search', { query: cleanQuery });

      // Search using trie-search
      const results = this.trie.search(cleanQuery) as Address[];

      // Limit results
      const limitedResults = results.slice(0, limit || this.resLimit);

      return limitedResults;
    } catch (error) {
      logger.error('Search operation failed', { query, error });
      return [];
    }
  }

  public getStats(): { totalAddresses: number } {
    return {
      totalAddresses: this.addresses.length,
    };
  }
}

export default new SearchService();
