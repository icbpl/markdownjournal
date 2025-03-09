
/**
 * Utility functions for search operations used in the HomePage components
 */

/**
 * Formats a search query for use in URL parameters
 * @param query The search query string
 * @returns Encoded search query string
 */
export const formatSearchQuery = (query: string): string => {
  return encodeURIComponent(query.trim());
};

/**
 * Validates if a search query is valid for submission
 * @param query The search query string
 * @returns Boolean indicating if the query is valid
 */
export const isValidSearchQuery = (query: string): boolean => {
  return query.trim().length > 0;
};

/**
 * Creates a search URL for navigation
 * @param query The search query string
 * @returns The formatted search URL
 */
export const createSearchUrl = (query: string): string => {
  if (!isValidSearchQuery(query)) {
    return '';
  }
  return `/search?q=${formatSearchQuery(query)}`;
};
