const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;

async function sendMessage(chat_id, text) {
  try {
    const res = await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id, text }),
    });
    const data = await res.json();
    if (!data.ok) {
      console.error('Telegram API error:', data);
    }
  } catch (e) {
    console.error('Fetch error:', e);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const body = await json(req);
  console.log('Incoming Telegram update:', body);

  const message = body.message;
  if (message && message.text) {
    const chat_id = message.chat.id;
    const text = message.text;

    await sendMessage(chat_id, `Вы написали: ${text}`);
  }

  res.status(200).json({ ok: true });
}
