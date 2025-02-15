import { handleRPSCommand } from './rps.js';
import { handleRoast } from './roast.js';
import { handleMock } from './mock.js';
import { handle8Ball } from './8ball.js';
import { handleYeet } from './yeet.js';
import { handleMeme } from './meme.js';
import { handleSimp } from './simp.js';
import { handleSus } from './sus.js';
import { handleDadJoke } from './dadjoke.js';
import { SlashCommandBuilder } from 'discord.js';

export const commands = [
    new SlashCommandBuilder()
        .setName('rps')
        .setDescription('Play Rock, Paper, Scissors')
        .addStringOption(option =>
            option.setName('choice')
                .setDescription('Your choice (rock/paper/scissors)')
                .setRequired(true)),
    new SlashCommandBuilder().setName('roast').setDescription('Roast someone'),
    new SlashCommandBuilder().setName('mock').setDescription('Mock a message'),
    new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Ask the magic 8ball a question')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('Your question')
                .setRequired(true)),
    new SlashCommandBuilder().setName('yeet').setDescription('YEET!'),
    new SlashCommandBuilder().setName('meme').setDescription('Get a random meme'),
    new SlashCommandBuilder().setName('simp').setDescription('Simp for someone'),
    new SlashCommandBuilder().setName('sus').setDescription('That\'s kinda sus'),
    new SlashCommandBuilder().setName('dadjoke').setDescription('Get a dad joke'),
];

export async function handleInteraction(interaction) {
    if (!interaction.isCommand()) return;

    const commandHandlers = {
        'rps': () => handleRPSCommand(interaction),
        'roast': () => handleRoast(interaction),
        'mock': () => handleMock(interaction),
        '8ball': () => handle8Ball(interaction),
        'yeet': () => handleYeet(interaction),
        'meme': () => handleMeme(interaction),
        'simp': () => handleSimp(interaction),
        'sus': () => handleSus(interaction),
        'dadjoke': () => handleDadJoke(interaction),
    };

    const handler = commandHandlers[interaction.commandName];
    if (handler) {
        try {
            await handler();
        } catch (error) {
            console.error(error);
            await interaction.reply({ 
                content: 'There was an error executing this command!', 
                ephemeral: true 
            });
        }
    }
}
