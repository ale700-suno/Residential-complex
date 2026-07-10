export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      error: "Method not allowed",
    });
  }

  const TOKEN = process.env.TOKEN;
  const CHAT_ID = process.env.CHAT_ID;

  if (!TOKEN || !CHAT_ID) {
    return res.status(500).json({
      ok: false,
      error: "TOKEN or CHAT_ID is missing",
    });
  }

  const { name, phone, comment } = req.body;

  const text = `
🏠 Новая заявка

👤 Имя: ${name || "-"}

📞 Телефон: ${phone || "-"}

💬 Комментарий: ${comment || "-"}
`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
        }),
      }
    );

    const data = await response.json();

    if (!data.ok) {
      return res.status(500).json(data);
    }

    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message,
    });
  }
}