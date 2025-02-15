export function handleSus(message) {
    const user = message.mentions.users.first() || message.author;
    message.channel.send(`🔎 ${user} is looking kinda sus... 🤨`);
}
