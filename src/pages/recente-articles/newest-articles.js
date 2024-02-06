export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Importa a função fetchRecentArticles da lib/api.js
    const { fetchNewestArticles } = require('../../lib/api');
    // Chama a função para obter os artigos mais recentes
    const newestArticle = await newestArticle();
    
    // Retorna os dados obtidos da API
    return res.status(200).json(fetchNewestArticles);
  } catch (error) {
    console.error('Error fetching recent articles:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
