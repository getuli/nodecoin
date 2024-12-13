import fastify from 'fastify';
import axios from 'axios';
import fastifyCors from '@fastify/cors'; // Importando o plugin CORS do Fastify

const server = fastify();

// Habilita CORS para todas as origens
server.register(fastifyCors, {
  origin: '*', // Permite requisições de todas as origens
});

// Definir a rota para obter dados das 10 moedas que mais subiram
server.get('/', async (request, reply) => {
  try {
    // Chave da API
    const apiKey = 'e8e0eb01-98fd-410c-9d4d-c202b6e40229';  // Substitua pela chave correta

    // Realizar a requisição para a API CoinMarketCap
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': apiKey, // Certifique-se de que a chave está aqui
      },
      params: {
        'limit': 10,  // Limitar a 10 moedas
        'sort': 'percent_change_24h', // Ordenar pela maior variação em 24h
      },
    });

    // Enviar a resposta com as 10 moedas mais subidas
    reply.send(response.data.data);
  } catch (error) {
    // Caso ocorra um erro, enviar detalhes do erro
    reply.status(500).send({ error: 'Erro ao buscar os dados', details: error.message });
  }
});

// Iniciar o servidor
server.listen({ port: 3335 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
});
