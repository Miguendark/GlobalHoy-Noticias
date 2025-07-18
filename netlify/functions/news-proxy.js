const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const NEWS_API_KEY = process.env.NEWS_API_KEY;

  if (!NEWS_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'NEWS_API_KEY no configurada en el entorno de Netlify Function.' }),
    };
  }

  const { category, q } = event.queryStringParameters;

  let url;
  if (q) {
    url = `https://newsapi.org/v2/everything?q=${q}&language=es&sortBy=relevancy&apiKey=${NEWS_API_KEY}`;
  } else if (category) {
    url = `https://newsapi.org/v2/top-headlines?category=${category}&language=es&apiKey=${NEWS_API_KEY}`;
  } else {
    url = `https://newsapi.org/v2/top-headlines?language=es&apiKey=${NEWS_API_KEY}`;
  }

  try {
    const apiResponse = await fetch(url);
    const data = await apiResponse.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error al proxy NewsAPI en Netlify Function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al obtener noticias de la API externa en Netlify Function.' }),
    };
  }
};