import {CastRemoveMessage} from '@farcaster/hub-nodejs';
import {db} from '../db/connection';
import {farcasterTimeToDate} from '../utils/farcasterTimeToDate';

const onCastRemove = async (messages: CastRemoveMessage[]) => {
    for (const message of messages) {
        await db.updateTable('casts')
            .where('fid', '=', message.data.fid)
            .where('hash', '=', message.data.castRemoveBody.targetHash)
            .set({deletedAt: farcasterTimeToDate(message.data.timestamp)})
            .execute();

        // Add additional logic here, such as CastHook queries (like when a cast is deleted, push x)
    }
}

export {onCastRemove};
