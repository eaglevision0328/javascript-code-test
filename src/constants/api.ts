export const API_BASE_URL = "http://api.book-seller-example.com";

export const API_ENDPOINTS = {
  BASE: API_BASE_URL,
  SEARCH_BY_AUTHOR: `${API_BASE_URL}/by-author`,
  SEARCH_BY_PUBLISHER: `${API_BASE_URL}/by-publisher`,
  SEARCH_BY_YEAR: `${API_BASE_URL}/by-year`,
};


export const DEFAULT_API_CONFIG = {
  method: "GET",
  limit: "10",
  format: "json",
};
