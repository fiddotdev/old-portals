import { farcasterTimeToDate } from '../utils/farcasterTimeToDate';
import { SignerRemoveMessage } from '@farcaster/hub-nodejs';
import { db } from '../db/connection';

const onSignerRemove = async (messages: SignerRemoveMessage[]) => {
  for (const message of messages) {
    await db
      .updateTable('signers')
      .where('fid', '=', message.data.fid)
      .where('signer', '=', message.data.signerRemoveBody.signer)
      .set({ deletedAt: farcasterTimeToDate(message.data.timestamp) })
      .execute();
  }
};

export { onSignerRemove };
