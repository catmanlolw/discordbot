import { readFile } from 'fs/promises';

export async function handleRoast(message) {
    const user = message.mentions.users.first();
    if (!user) return message.channel.send("Mention someone to roast!");

    try {
        const data = await readFile('./data/roasts.json', 'utf8');
        const roasts = JSON.parse(data).roasts;
        const roast = roasts[Math.floor(Math.random() * roasts.length)];

        message.channel.send(`${user}, ${roast}`);
    } catch (error) {
        console.error("Error reading roast file:", error);
        message.channel.send("Couldn't load a roast, try again later.");
    }
}
