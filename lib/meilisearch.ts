// import { MeiliSearch } from 'meilisearch';

// /**
//  * Initialize a Meilisearch client using environment variables.
//  * Ensure MEILISEARCH_HOST and MEILISEARCH_API_KEY are defined in .env.
//  */
// export const meiliClient = new MeiliSearch({
//   host: process.env.MEILISEARCH_HOST ?? '',
//   apiKey: process.env.MEILISEARCH_API_KEY ?? '',
// });

// /**
//  * Search the "products" index.
//  * @param query The search query string.
//  * @param limit Maximum number of results to return.
//  * @returns The raw hits from Meilisearch.
//  */
// export async function searchProducts(query: string, limit: number) {
//   const index = meiliClient.index('products');
//   const result = await index.search(query, { limit });
//   return result.hits;
// }
