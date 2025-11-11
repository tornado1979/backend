import TrieSearch from 'trie-search';
import * as fs from 'fs';
import * as path from 'path';
import logger from '../utils/logger';
import { Address } from '../types';

class SearchService {
  private trie!: TrieSearch<Address>;
  private addresses: Address[] = [];
  private resLimit = 50;

  constructor() {
    this.initializeTrie();
  }

  private initializeTrie(): void {
    try {
      const dataPath = path.join(__dirname, '../../data/addresses.json');
      const rawData = fs.readFileSync(dataPath, 'utf8');
      this.addresses = JSON.parse(rawData) as Address[];

      // Create trie-search instance, and add the keyfields
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
      const data = this.trie.search(cleanQuery) as Address[];

      // Limit results
      const limitedData = data.slice(0, limit || this.resLimit);

      return limitedData;
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
