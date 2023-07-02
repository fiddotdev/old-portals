import {bytesToHexString, VerificationRemoveMessage} from '@farcaster/hub-nodejs';
import {db} from '../db/connection';
import {sql} from 'kysely';
import {safeUnwrapForHubEvent} from '../utils/safeUnwrap';
import {farcasterTimeToDate} from '../utils/farcasterTimeToDate';

const onVerificationRemove = async (messages: VerificationRemoveMessage[]) => {
    for (const message of messages) {
        await db.updateTable('verifications')
            .where('fid', '=', message.data.fid)
            .where(sql`claim
            ->> 'address'`, '=', safeUnwrapForHubEvent(() => bytesToHexString(message.data.verificationRemoveBody.address)._unsafeUnwrap()))
            .set({deletedAt: farcasterTimeToDate(message.data.timestamp)})
            .execute();

        // Add any additional logic here, such as CastHooks queries
    }
}

export {onVerificationRemove};
