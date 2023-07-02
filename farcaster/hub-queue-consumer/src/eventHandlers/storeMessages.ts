import {bytesToHexString, Message} from '@farcaster/hub-nodejs';
import {db} from '../db/connection';
import {farcasterTimeToDate} from '../utils/farcasterTimeToDate';
import {sql} from 'kysely';

type StoreMessageOperation = 'merge' | 'delete' | 'prune' | 'revoke';

const storeMessages = async (messages: Message[], operation: StoreMessageOperation) => {
    if (!messages.length) return;

    const now = new Date();

    const messageRows = await db.insertInto('messages').values(
        messages.map((message) => {
            if (!message.data) throw new Error('Message missing data!'); // Shouldn't happen
            return {
                createdAt: now,
                updatedAt: now,
                fid: message.data.fid,
                messageType: message.data.type,
                timestamp: farcasterTimeToDate(message.data.timestamp),
                hash: message.hash,
                hashScheme: message.hashScheme,
                signature: message.signature,
                signatureScheme: message.signatureScheme,
                signer: message.signer,
                raw: Message.encode(message).finish(),
                deletedAt: operation === 'delete' ? now : null,
                prunedAt: operation === 'prune' ? now : null,
                revokedAt: operation === 'revoke' ? now : null,
            };
        })
    ).onConflict((oc) =>
        oc
            .columns(['hash'])
            .doUpdateSet(({ref}) => ({
                updatedAt: now,
                // Only the signer or message state could have changed
                signature: ref('excluded.signature'),
                signatureScheme: ref('excluded.signatureScheme'),
                signer: ref('excluded.signer'),
                deletedAt: operation === 'delete' ? now : null,
                prunedAt: operation === 'prune' ? now : null,
                revokedAt: operation === 'revoke' ? now : null,
            }))
            .where(({or, cmpr, ref}) =>
                // Only update if a value has actually changed
                or([
                    cmpr('excluded.signature', '!=', ref('messages.signature')),
                    cmpr('excluded.signatureScheme', '!=', ref('messages.signatureScheme')),
                    cmpr('excluded.signer', '!=', ref('messages.signer')),
                    cmpr('excluded.deletedAt', 'is', sql`distinct from
                    ${ref('messages.deletedAt')}`),
                    cmpr('excluded.prunedAt', 'is', sql`distinct from
                    ${ref('messages.prunedAt')}`),
                    cmpr('excluded.revokedAt', 'is', sql`distinct from
                    ${ref('messages.revokedAt')}`),
                ])
            )
    )
        .returning(['hash', 'updatedAt', 'createdAt'])
        .execute();

    return Object.fromEntries(messageRows.map((row) => [bytesToHexString(row.hash), row.updatedAt === row.createdAt]));
}

export {storeMessages};
