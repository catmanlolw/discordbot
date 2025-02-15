export function handleYeet(message) {
    const user = message.mentions.users.first();
    if (!user) return message.channel.send("Mention someone to YEET!");

    message.channel.send(`🚀 ${user} has been YEETED into the void!`);
}
