import {bytesToHexString, CastAddMessage} from '@farcaster/hub-nodejs';
import {db} from '../db/connection';
import {farcasterTimeToDate} from '../utils/farcasterTimeToDate';

const onCastAdd = async (messages: CastAddMessage[], isInitialCreation: Record<string, boolean>) => {
    await db
        .insertInto('casts')
        .values(
            messages.map((message) => ({
                timestamp: farcasterTimeToDate(message.data.timestamp),
                fid: message.data.fid,
                text: message.data.castAddBody.text,
                hash: message.hash,
                parentHash: message.data.castAddBody.parentCastId?.hash,
                parentFid: message.data.castAddBody.parentCastId?.fid,
                parentUrl: message.data.castAddBody.parentUrl,
                embeds: message.data.castAddBody.embedsDeprecated,
                mentions: message.data.castAddBody.mentions,
                mentionsPositions: message.data.castAddBody.mentionsPositions,
            }))
        )
        // Do nothing on conflict since nothing should have changed if hash is the same.
        .onConflict((oc) => oc.columns(['hash']).doNothing())
        .execute();

    for (const message of messages) {
        const hash = bytesToHexString(message.hash);
        if (hash.isOk()) {
            if (isInitialCreation[hash.value]) {
                // Do any additional actions here, such as CastHooks queries
            } else {
                // Do any additional actions here, such as CastHooks queries
            }
        }
    }
}

export {onCastAdd};
