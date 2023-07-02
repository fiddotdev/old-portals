import {farcasterTimeToDate} from '../utils/farcasterTimeToDate';
import {bytesToHexString, LinkAddMessage} from '@farcaster/hub-nodejs';
import {db} from '../db/connection';

const onLinkAdd = async (
    messages: LinkAddMessage[],
    isInitialCreation: Record<string, boolean>
) => {
    await db
        .insertInto('links')
        .values(
            messages.map((message) => ({
                timestamp: farcasterTimeToDate(message.data.timestamp),
                // type assertion due to a problem with the type definitions. This field is infact required and present in all valid messages
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                targetFid: message.data.linkBody.targetFid!,
                type: message.data.linkBody.type,
                fid: message.data.fid,
                displayTimestamp: message.data.linkBody.displayTimestamp
                    ? farcasterTimeToDate(message.data.linkBody.displayTimestamp)
                    : undefined,
            }))
        )
        .execute();

    for (const message of messages) {
        const hash = bytesToHexString(message.hash);
        if (hash.isOk() && isInitialCreation[hash.value]) {
            // Implement any additional logic here, such as CastHooks queries
        }
    }
};

export {onLinkAdd};
