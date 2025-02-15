const games = new Map();

export async function handleRPSCommand(client, message, args) {
    if (args.length !== 1) {
        message.channel.send('Usage: !rps @opponent');
        return;
    }

    const opponent = message.mentions.users.first();
    if (!opponent || opponent.id === message.author.id) {
        message.channel.send('Please mention a valid user.');
        return;
    }

    message.channel.send(`${opponent}, do you accept the challenge? Reply with "yes" or "no".`);

    const filter = response => response.author.id === opponent.id && ['yes', 'no'].includes(response.content.toLowerCase());
    message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
        .then(collected => {
            if (collected.first().content.toLowerCase() === 'yes') {
                message.channel.send('Challenge accepted! Check your DMs.');
                
                games.set(message.author.id, { opponent: opponent.id, choices: {}, channelId: message.channel.id });
                games.set(opponent.id, { opponent: message.author.id, choices: {}, channelId: message.channel.id });

                message.author.send('Choose rock, paper, or scissors.');
                opponent.send('Choose rock, paper, or scissors.');
            } else {
                message.channel.send('Challenge declined.');
            }
        })
        .catch(() => {
            message.channel.send('No response, challenge declined.');
        });
}

export function processRPSChoice(client, dm) {
    if (!games.has(dm.author.id)) {
        dm.author.send('You are not in an active game.').catch(console.error);
        return;
    }

    const game = games.get(dm.author.id);
    const choice = dm.content.toLowerCase();
    if (!['rock', 'paper', 'scissors'].includes(choice)) {
        dm.author.send('Invalid choice. Choose rock, paper, or scissors.').catch(console.error);
        return;
    }

    game.choices[dm.author.id] = choice;
    
    // Add error handling for the confirmation message
    dm.author.send('Choice received.').catch(error => {
        console.error('Failed to send confirmation message:', error);
    });

    if (game.choices[game.opponent]) {
        const player1Choice = game.choices[dm.author.id];
        const player2Choice = game.choices[game.opponent];

        let result;
        if (player1Choice === player2Choice) {
            result = "It's a tie!";
        } else if (
            (player1Choice === 'rock' && player2Choice === 'scissors') ||
            (player1Choice === 'paper' && player2Choice === 'rock') ||
            (player1Choice === 'scissors' && player2Choice === 'paper')
        ) {
            result = `<@${dm.author.id}> wins!`;
        } else {
            result = `<@${game.opponent}> wins!`;
        }

        client.channels.fetch(game.channelId)
            .then(channel => {
                channel.send(`Results: <@${dm.author.id}> chose ${player1Choice}, <@${game.opponent}> chose ${player2Choice}. ${result}`)
                    .catch(error => console.error('Failed to send results:', error));
            })
            .catch(error => console.error('Failed to fetch channel:', error));

        games.delete(dm.author.id);
        games.delete(game.opponent);
    }
}