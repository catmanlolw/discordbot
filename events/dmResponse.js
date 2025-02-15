import { processRPSChoice } from '../commands/rps.js';

export function handleDMResponse(client, dm) {
    if (dm.channel.type === 'DM') {
        processRPSChoice(client, dm);
    }
}
