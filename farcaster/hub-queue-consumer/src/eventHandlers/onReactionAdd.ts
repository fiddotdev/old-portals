import { bytesToHexString, ReactionAddMessage } from '@farcaster/hub-nodejs';
import { farcasterTimeToDate } from '../utils/farcasterTimeToDate';
import { db } from '../db/connection';

const onReactionAdd = async (
  messages: ReactionAddMessage[],
  isInitialCreation: Record<string, boolean>
) => {
  await db
    .insertInto('reactions')
    .values(
      messages.map((message) => ({
        fid: message.data.fid,
        timestamp: farcasterTimeToDate(message.data.timestamp),
        hash: message.hash,
        reactionType: message.data.reactionBody.type,
        targetHash: message.data.reactionBody.targetCastId?.hash,
        targetFid: message.data.reactionBody.targetCastId?.fid,
        targetUrl: message.data.reactionBody.targetUrl,
      }))
    )
    // Do nothing on conflict since nothing should have changed if hash is the same.
    .onConflict((oc) => oc.columns(['hash']).doNothing())
    .execute();

  for (const message of messages) {
    const hash = bytesToHexString(message.hash);
    if (hash.isOk() && isInitialCreation[hash.value]) {
      // Implement any additional logic here, such as CastHooks queries
    }
  }
};

export { onReactionAdd };
