export function startRandomEvents(client) {
    setInterval(async () => {
        const guilds = client.guilds.cache;
        for (const guild of guilds.values()) {
            const members = await guild.members.fetch();
            const onlineMembers = members.filter(member => !member.user.bot && member.presence?.status === 'online');

            if (onlineMembers.size > 0) {
                const randomMember = onlineMembers.random();
                const eventType = Math.random() < 0.5 ? 'crateDrop' : 'renameMember';

                if (eventType === 'crateDrop') {
                    const channel = guild.channels.cache.find(ch => ch.isTextBased() && ch.permissionsFor(guild.members.me).has('SEND_MESSAGES'));
                    if (channel) {
                        channel.send(`${randomMember}, a crate has dropped! Type "claim" within 30 seconds to grab it!`);

                        const filter = response => response.author.id === randomMember.id && response.content.toLowerCase() === 'claim';
                        channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
                            .then(() => channel.send(`${randomMember} claimed the crate!`))
                            .catch(() => channel.send('No one claimed the crate.'));
                    }
                } else if (eventType === 'renameMember') {
                    const newNickname = 'MagicWordUser';
                    await randomMember.setNickname(newNickname).catch(() => null);
                    
                    const channel = guild.channels.cache.find(ch => ch.isTextBased() && ch.permissionsFor(guild.members.me).has('SEND_MESSAGES'));
                    if (channel) {
                        channel.send(`${randomMember}, you have been renamed! Type "magicword" in 30 seconds to restore your name.`);

                        const filter = response => response.author.id === randomMember.id && response.content.toLowerCase() === 'magicword';
                        channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
                            .then(() => {
                                randomMember.setNickname(null).catch(() => null);
                                channel.send(`${randomMember} has restored their name!`);
                            })
                            .catch(() => channel.send(`${randomMember} didn't say the magic word!`));
                    }
                }
            }
        }
    }, 60000); // Runs every 60 seconds
}
