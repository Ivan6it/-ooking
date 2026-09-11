import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Busboy from 'busboy';

const PORT = 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../src/data');

const routes = {
  '/api/additionalIngredients': 'additionalIngredients.json',
  '/api/directorySection': 'directorySection.json',
  '/api/filters': 'filters.json',
  '/api/foods': 'foods.json',
  '/api/ingredients': 'ingredients.json',
  '/api/kitchens': 'kitchens.json',
  '/api/users': 'users.json',
  '/api/auth/register': 'users.json',
  '/api/auth/login': 'users.json',
  '/api/users/me': 'users.json',
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

  const isLikeRoute =
    req.method === 'PUT' && req.url.startsWith('/api/foods/') && req.url.endsWith('/like');

  if (!fileName && !isLikeRoute) {
    sendJson(res, 404, {
      error: 'Not found',
    });

    return;
  }

  if (req.method === 'GET' && req.url === '/api/users/me') {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return sendJson(res, 401, {
          error: 'No token provided',
        });
      }

      const usersList = await readJson('users.json');

      const currentUser = usersList.find(
        (user) => user.mail === token || user.id.toString() === token,
      );

      if (!currentUser) {
        return sendJson(res, 401, {
          error: 'User not found',
        });
      }

      const { password, ...safeUser } = currentUser;

      return sendJson(res, 200, {
        user: safeUser,
      });
    } catch (error) {
      console.error(error);

      return sendJson(res, 500, {
        error: 'Server error in /me',
      });
    }
  }

  if (isLikeRoute) {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return sendJson(res, 401, {
          error: 'No token provided',
        });
      }

      const recipeId = Number(req.url.split('/')[3]);

      if (!recipeId) {
        return sendJson(res, 400, {
          error: 'Invalid recipe id',
        });
      }

      const usersList = await readJson('users.json');
      const foodsList = await readJson('foods.json');

      const userIndex = usersList.findIndex(
        (user) => user.mail === token || user.id.toString() === token,
      );

      if (userIndex === -1) {
        return sendJson(res, 401, {
          error: 'User not found',
        });
      }

      const recipeIndex = foodsList.findIndex((recipe) => recipe.id === recipeId);

      if (recipeIndex === -1) {
        return sendJson(res, 404, {
          error: 'Recipe not found',
        });
      }

      const user = usersList[userIndex];
      const recipe = foodsList[recipeIndex];

      if (!Array.isArray(user.liked)) {
        user.liked = [];
      }

      const likedIndex = user.liked.indexOf(recipeId);

      if (likedIndex === -1) {
        user.liked.push(recipeId);
        recipe.likes += 1;
      } else {
        user.liked.splice(likedIndex, 1);
        recipe.likes = Math.max(0, recipe.likes - 1);
      }

      await writeJson('users.json', usersList);
      await writeJson('foods.json', foodsList);

      return sendJson(res, 200, {
        liked: likedIndex === -1,

        likes: recipe.likes,
      });
    } catch (error) {
      console.error(error);

      return sendJson(res, 500, {
        error: 'Failed to update like',
      });
    }
  }

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

  if (req.method === 'PUT' && req.url === '/api/foods') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const updateData = JSON.parse(body);

        const foodsList = await readJson('foods.json');

        const foodIndex = foodsList.findIndex((food) => food.id === updateData.id);

        if (foodIndex === -1) {
          return sendJson(res, 404, {
            error: 'Recipe not found',
          });
        }

        foodsList[foodIndex] = {
          ...foodsList[foodIndex],
          ...updateData,
        };

        await writeJson('foods.json', foodsList);

        sendJson(res, 200, {
          success: true,
          food: foodsList[foodIndex],
        });
      } catch (error) {
        console.error(error);

        sendJson(res, 500, {
          error: 'Food update failed',
        });
      }
    });

    return;
  }

  if (req.method === 'PUT' && req.url === '/api/users') {
    const contentType = req.headers['content-type'] || '';

    if (contentType.includes('application/json')) {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', async () => {
        try {
          const updateData = JSON.parse(body);
          const usersList = await readJson(fileName);

          const userIndex = usersList.findIndex((user) => user.id === updateData.id);

          if (userIndex === -1) {
            return sendJson(res, 404, {
              error: 'User not found',
            });
          }

          usersList[userIndex] = {
            ...usersList[userIndex],
            ...updateData,
          };

          await writeJson(fileName, usersList);

          const { password, ...safeUser } = usersList[userIndex];

          sendJson(res, 200, {
            success: true,
            user: safeUser,
          });
        } catch (error) {
          console.error(error);

          sendJson(res, 500, {
            error: 'Update failed',
          });
        }
      });

      return;
    }

    if (contentType.includes('multipart/form-data')) {
      const busboy = Busboy({
        headers: req.headers,
      });

      let userId = '';
      let imageBuffer = Buffer.alloc(0);
      let imageExtension = '';

      busboy.on('field', (name, value) => {
        if (name === 'id') {
          userId = value;
        }
      });

      busboy.on('file', (name, file, info) => {
        if (name !== 'image') {
          file.resume();
          return;
        }

        const { filename, mimeType } = info;

        const extensionMap = {
          'image/jpeg': '.jpg',
          'image/png': '.png',
          'image/webp': '.webp',
        };

        imageExtension = extensionMap[mimeType] || path.extname(filename) || '.jpg';

        const chunks = [];

        file.on('data', (chunk) => {
          chunks.push(chunk);
        });

        file.on('end', () => {
          imageBuffer = Buffer.concat(chunks);
        });
      });

      busboy.on('finish', async () => {
        try {
          if (!userId) {
            return sendJson(res, 400, {
              error: 'User id is required',
            });
          }

          const usersList = await readJson('users.json');

          const userIndex = usersList.findIndex((user) => user.id.toString() === userId);

          if (userIndex === -1) {
            return sendJson(res, 404, {
              error: 'User not found',
            });
          }

          if (!imageBuffer.length) {
            return sendJson(res, 400, {
              error: 'Image is required',
            });
          }

          const fileName = `user-${userId}-${Date.now()}${imageExtension}`;

          const imageDirectory = path.join(__dirname, '../public/images/imageUsers');

          await fs.mkdir(imageDirectory, {
            recursive: true,
          });

          const imagePath = path.join(imageDirectory, fileName);

          await fs.writeFile(imagePath, imageBuffer);

          const publicImagePath = `/images/imageUsers/${fileName}`;

          usersList[userIndex] = {
            ...usersList[userIndex],
            image: publicImagePath,
          };

          await writeJson('users.json', usersList);

          const { password, ...safeUser } = usersList[userIndex];

          sendJson(res, 200, {
            success: true,
            user: safeUser,
          });
        } catch (error) {
          console.error(error);

          sendJson(res, 500, {
            error: 'Image update failed',
          });
        }
      });

      req.pipe(busboy);

      return;
    }

    sendJson(res, 400, {
      error: 'Unsupported content type',
    });

    return;
  }

  if (req.method === 'POST') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const data = JSON.parse(body);

        if (req.url === '/api/auth/register') {
          const usersList = await readJson('users.json');

          const exists = usersList.find((user) => user.mail === data.mail);

          if (exists) {
            return sendJson(res, 409, {
              error: 'Email already exists',
            });
          }

          const newUser = {
            id: Date.now(),
            name: data.name,
            mail: data.mail,
            password: data.password,
            surname: '',
            image: '/images/imageUsers/Anonim.jpg',
            gender: 'none',
            birthday: null,
            liked: [],
            cookbooks: [],
            shoppinglist: [],
          };

          usersList.push(newUser);

          await writeJson('users.json', usersList);

          const { password, ...safeUser } = newUser;

          return sendJson(res, 201, {
            token: newUser.mail,
            user: safeUser,
          });
        }

        if (req.url === '/api/auth/login') {
          const usersList = await readJson('users.json');

          const user = usersList.find(
            (user) => user.mail === data.mail && user.password === data.password,
          );

          if (!user) {
            return sendJson(res, 401, {
              error: 'Invalid credentials',
            });
          }

          const { password, ...safeUser } = user;

          sendJson(res, 200, {
            token: data.mail,
            user: safeUser,
          });
        }
      } catch (error) {
        console.error(error);

        sendJson(res, 500, {
          error: 'Server error',
        });
      }
    });

    return;
  }

  sendJson(res, 405, {
    error: 'Method not allowed',
  });
});

server.listen(PORT, () => {
  console.log(`Node server running on http://localhost:${PORT}`);
});
