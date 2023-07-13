import express, { Request, Response } from 'express';
import type { WebhookEvent } from '@clerk/clerk-sdk-node';
import { Webhook } from 'svix';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.post('/newClerkUser', (req: Request, res: Response) => {
  const secret = 'whsec_nN/3ml7RQbbsQeoxqulo/05nUHwq6HIX';

  const wh = new Webhook(secret);

  try {
    const payload = wh.verify(
      JSON.stringify(req.body),
      req.headers as Record<any, any>
    );

    const event = payload as WebhookEvent;

    switch (event.type) {
      case 'user.created': {
        console.log(event.data.id);
        break;
      }
    }

    return res.status(200).json({
      status: 200,
      message: 'Payload Verified',
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: 'Payload and Headers could not be verified!',
    });
  }
});

app.get('/authenticate', (req: Request, res: Response) => {
  const publicKey = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwwsv4M80VGC66kbpS5z5
FYyqoIWnzLq9gKKOMc25YIBFaL7X/wVZK81edddkEvR4RWyB3m2QeyOUbH/0aHLD
YdmXJhC9b0YXbkIp1ywkv+GIzFnACkRebMzkeS5Us25Ts3Qhra45mHZJ7m9H6ZAj
PXWPkzOzRlbL126JBbovvslbgg+sNNHsYOIPL+znKao/Idc5NezJAGv+hX2qTi70
obW8JQD+JNZH7SezPlAnRfDXU5guZxyrrklBjTHJdhchmtEeJHKmCDHymJdXvkAU
fi8nvJr8nQ4E0FgR5bkmaChsqpKU27DP/mARlGC4OV2/BnXJmniILHRFJv8q6W9i
hwIDAQAB
-----END PUBLIC KEY-----
`;
  const token = req.headers['authorization'] as string;

  console.log(publicKey);
  console.log(token);
  const decoded = jwt.verify(token, publicKey);

  console.log(decoded);
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
