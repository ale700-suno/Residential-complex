// app/api/send/route.ts
export async function POST(request: Request) {
  try {
    const { name, phone, comment, source } = await request.json();

    const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TOKEN || !CHAT_ID) {
      return Response.json(
        { ok: false, error: "TOKEN или CHAT_ID не настроены" },
        { status: 500 }
      );
    }

    const text = `
🏠 Новая заявка с сайта

👤 Имя: ${name || "-"}
📞 Телефон: ${phone || "-"}
💬 Комментарий: ${comment || "-"}

${source ? `📍 Источник: ${source}` : ""}
🕒 Время: ${new Date().toLocaleString('ru-RU')}
    `.trim();

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "HTML",
        }),
      }
    );

    const data = await telegramResponse.json();

    if (!data.ok) {
      console.error("Telegram error:", data);
      return Response.json({ ok: false, error: data.description }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Send error:", error);
    return Response.json(
      { ok: false, error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}