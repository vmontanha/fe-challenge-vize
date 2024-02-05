export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { id } = req.query;

  try {
    const response = await fetch(`https://dev.to/api/articles/${id}`);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching article by id:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
