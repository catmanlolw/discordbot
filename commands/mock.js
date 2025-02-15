export function handleMock(message, args) {
    if (!args.length) return message.channel.send("Provide text to mock!");

    const text = args.join(" ");
    let mockedText = '';
    for (let i = 0; i < text.length; i++) {
        mockedText += i % 2 === 0 ? text[i].toLowerCase() : text[i].toUpperCase();
    }

    message.channel.send(mockedText);
}
