import fetch from 'node-fetch';

export async function handleDadJoke(message) {
    try {
        const response = await fetch('https://icanhazdadjoke.com/', { headers: { Accept: 'application/json' } });
        const data = await response.json();
        message.channel.send(data.joke);
    } catch (error) {
        message.channel.send("Couldn't fetch a dad joke, try again later.");
    }
}
