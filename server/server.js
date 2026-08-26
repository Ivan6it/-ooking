import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PORT = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../src/data');

// Какие API-маршруты соответствуют каким JSON-файлам
const routes = {
  '/api/additionalIngredients': 'additionalIngredients.json',
  '/api/directorySection': 'directorySection.json',
  '/api/filters': 'filters.json',
  '/api/foods': 'foods.json',
  '/api/ingredients': 'ingredients.json',
  '/api/kitchens': 'kitchens.json',
  '/api/users': 'users.json',
};

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
  });

  res.end(JSON.stringify(data));
}

async function readJson(fileName) {
  const filePath = path.join(dataDir, fileName);

  const file = await fs.readFile(filePath, 'utf-8');

  return JSON.parse(file);
}

async function writeJson(fileName, data) {
  const filePath = path.join(dataDir, fileName);

  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

const server = http.createServer(async (req, res) => {
  const fileName = routes[req.url];

  // Если такого API-маршрута нет
  if (!fileName) {
    sendJson(res, 404, {
      error: 'Not found',
    });

    return;
  }

  // GET
  if (req.method === 'GET') {
    try {
      const data = await readJson(fileName);

      sendJson(res, 200, data);
    } catch (error) {
      console.error(error);

      sendJson(res, 500, {
        error: 'Cannot read JSON file',
      });
    }

    return;
  }

  // PUT
  if (req.method === 'PUT') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const data = JSON.parse(body);

        await writeJson(fileName, data);

        sendJson(res, 200, {
          success: true,
          data,
        });
      } catch (error) {
        console.error(error);

        sendJson(res, 500, {
          error: 'Cannot write JSON file',
        });
      }
    });

    return;
  }

  // Метод не поддерживается
  sendJson(res, 405, {
    error: 'Method not allowed',
  });
});

server.listen(PORT, () => {
  console.log(`Node server running on http://localhost:${PORT}`);
});
