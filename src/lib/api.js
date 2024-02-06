const BASE_URL = 'https://dev.to/api';

// Função para buscar os artigos mais relevantes
export const fetchFreshArticles = async () => {
  const response = await fetch(`${BASE_URL}/articles?top=1`);
  const data = await response.json();
  console.log(data)
  return data;
};

// Função para buscar os artigos mais recentes
export const fetchNewestArticles = async () => {
  const response = await fetch(`${BASE_URL}/articles/latest`);
  const data = await response.json();
  console.log(data)
  return data;
};

// Função para buscar os artigos mais recentes
export const fetchOldestArticle = async () => {
  const response = await fetch(`${BASE_URL}/articles/`);
  const data = await response.json();
  console.log(data)
  return data;
};

// Função para buscar um artigo específico pelo id
export const fetchArticleById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/articles/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching article by id:', error);
    throw error; // Propagar o erro para ser tratado no componente
  }
};


