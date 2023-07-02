import { farcasterTimeToDate } from '../utils/farcasterTimeToDate';
import { LinkRemoveMessage } from '@farcaster/hub-nodejs';
import { db } from '../db/connection';

const onLinkRemove = async (messages: LinkRemoveMessage[]) => {
  for (const message of messages) {
    await db
      .updateTable('links')
      .where('fid', '=', message.data.fid)
      // type assertion due to a problem with the type definitions. This field is infact required and present in all valid messages
      .where('targetFid', '=', message.data.linkBody.targetFid!)
      .where('type', '=', message.data.linkBody.type)
      .set({ deletedAt: farcasterTimeToDate(message.data.timestamp) })
      .execute();
  }
};

export { onLinkRemove };
