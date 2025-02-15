export function handleSimp(message) {
    const user = message.mentions.users.first() || message.author;
    const simpLevel = Math.floor(Math.random() * 101);
    message.channel.send(`${user}, you are ${simpLevel}% simp. 😳`);
}
