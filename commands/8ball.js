const responses = [
    "Yes, absolutely! (Not really.)",
    "Nope, not a chance.",
    "Ask again later, I'm too busy ignoring you.",
    "Maybe... but probably not.",
    "Sure, if you believe in miracles.",
    "I dunno, go ask Google.",
];

export function handle8Ball(message, args) {
    if (!args.length) return message.channel.send("You need to ask a question!");
    
    const response = responses[Math.floor(Math.random() * responses.length)];
    message.channel.send(`🎱 ${response}`);
}
