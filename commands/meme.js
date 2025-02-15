import fetch from 'node-fetch';

export async function handleMeme(message) {
    try {
        const response = await fetch('https://meme-api.com/gimme');
        const data = await response.json();
        message.channel.send({ content: data.title, files: [data.url] });
    } catch (error) {
        message.channel.send("Couldn't fetch a meme, try again later.");
    }
}
