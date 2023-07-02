import { farcasterTimeToDate } from '../utils/farcasterTimeToDate';
import { bytesToHexString, UserDataAddMessage } from '@farcaster/hub-nodejs';
import { db } from '../db/connection';

const onUserDataAdd = async (
  messages: UserDataAddMessage[],
  isInitialCreation: Record<string, boolean>
) => {
  const now = new Date();

  await db
    .insertInto('userData')
    .values(
      messages.map((message) => ({
        timestamp: farcasterTimeToDate(message.data.timestamp),
        fid: message.data.fid,
        hash: message.hash,
        type: message.data.userDataBody.type,
        value: message.data.userDataBody.value,
      }))
    )
    .onConflict((oc) =>
      oc
        .columns(['fid', 'type'])
        .doUpdateSet(({ ref }) => ({
          hash: ref('excluded.hash'),
          timestamp: ref('excluded.timestamp'),
          value: ref('excluded.value'),
          updatedAt: now,
        }))
        .where(({ or, cmpr, ref }) =>
          // Only update if a value has actually changed
          or([
            cmpr('excluded.hash', '!=', ref('userData.hash')),
            cmpr('excluded.timestamp', '!=', ref('userData.timestamp')),
            cmpr('excluded.value', '!=', ref('userData.value')),
            cmpr('excluded.updatedAt', '!=', ref('userData.updatedAt')),
          ])
        )
    )
    .execute();

  for (const message of messages) {
    const hash = bytesToHexString(message.hash);
    if (hash.isOk() && isInitialCreation[hash.value]) {
      // Add any additional logic, such as CastHooks queries
    }
  }
};

export { onUserDataAdd };
