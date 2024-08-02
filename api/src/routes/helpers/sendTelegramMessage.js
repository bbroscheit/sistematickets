const fetch = require('node-fetch');
const { TELEGRAMTOKEN } = process.env

const sendTelegramMessage = async (chatId, message) => {
    const TELEGRAM_TOKEN = TELEGRAMTOKEN ;
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message
        })
    });

    if (!res.ok) {
        throw new Error(`Error al enviar mensaje a Telegram: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
};

module.exports = sendTelegramMessage;