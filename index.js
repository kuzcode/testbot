
import { json } from 'micro';

const TELEGRAM_TOKEN = '7553508410:AAFBpeltLRJRSIQ16te9UHLO2wppGCKiIaM'; // токен бота из переменных окружения
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

async function sendMessage(chat_id, text) {
  await fetch(`${TELEGRAM_API}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id, text }),
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const body = await json(req);
  const message = body.message;

  if (message && message.text) {
    const chat_id = message.chat.id;
    const text = message.text;

    // Например, отвечаем тем же текстом
    await sendMessage(chat_id, `Вы написали: ${text}`);
  }

  res.status(200).json({ ok: true });
}
