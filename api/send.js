export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const TOKEN = "8823578928:AAGpZ7X43buPYiJawsonKSZvApUPgKl2O1Q";
    const CHAT_ID = "834950023";

    const {
        name,
        phone,
        comment
    } = req.body;

    const text = `
🏠 Новая заявка

👤 Имя: ${name}

📞 Телефон: ${phone}

💬 Комментарий: ${comment || "-"}
`;

    try {

        const tg = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`,{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                chat_id:CHAT_ID,
                text:text
            })

        });

        const data = await tg.json();

        res.status(200).json(data);

    } catch(e){

        res.status(500).json({
            ok:false,
            error:e.message
        });

    }

}