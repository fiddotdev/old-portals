import { farcasterTimeToDate } from '../utils/farcasterTimeToDate';
import { bytesToHexString, SignerAddMessage } from '@farcaster/hub-nodejs';
import { db } from '../db/connection';

const onSignerAdd = async (
  messages: SignerAddMessage[],
  isInitialCreation: Record<string, boolean>
) => {
  await db
    .insertInto('signers')
    .values(
      messages.map((message) => {
        const signerName = message.data.signerAddBody.name;
        return {
          fid: message.data.fid,
          timestamp: farcasterTimeToDate(message.data.timestamp),
          hash: message.hash,
          custodyAddress: message.signer,
          signer: message.data.signerAddBody.signer,
          name: signerName?.length ? signerName : null, // Treat empty string signer names as not specified
        };
      })
    )
    // Do nothing on conflict since nothing should have changed if hash is the same.
    .onConflict((oc) => oc.columns(['hash']).doNothing())
    .execute();

  for (const message of messages) {
    const hash = bytesToHexString(message.hash);
    if (hash.isOk() && isInitialCreation[hash.value]) {
      // Add additional logic here, such as CastHooks queries
    }
  }
};

export { onSignerAdd };
