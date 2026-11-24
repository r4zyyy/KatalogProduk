const BASE_URL = 'https://dummyjson.com';

async function requestJson(endpoint, signal) {
  const response = await fetch(`${BASE_URL}${endpoint}`, { signal });
  if (!response.ok) {
    throw new Error(`Gagal memuat data (HTTP ${response.status})`);
  }
  return response.json();
}

export async function getProducts(signal) {
  const data = await requestJson('/products?limit=0', signal);
  return data.products || [];
}

export async function getProductById(id, signal) {
  return requestJson(`/products/${id}`, signal);
}

export async function getCategories(signal) {
  return requestJson('/products/categories', signal);
}
