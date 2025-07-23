const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const NEWSAPI_KEY = process.env.NEWSAPI_KEY; // Obtener la clave API de las variables de entorno de Netlify
  const { category, q, pageSize } = event.queryStringParameters; // Parámetros de la solicitud del frontend

  let url;
  let params = `apiKey=${NEWSAPI_KEY}&language=en`;

  if (q) {
    url = `https://newsapi.org/v2/everything`;
    params += `&q=${encodeURIComponent(q)}`;
  } else {
    url = `https://newsapi.org/v2/top-headlines`;
    params += `&category=${encodeURIComponent(category || 'general')}`;
  }

  params += `&pageSize=${pageSize || 10}`;

  try {
    const response = await fetch(`${url}?${params}`);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error('Error fetching from NewsAPI:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch news', details: error.message })
    };
  }
};