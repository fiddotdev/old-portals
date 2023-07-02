import { ReactionRemoveMessage } from '@farcaster/hub-nodejs';
import { db } from '../db/connection';
import { farcasterTimeToDate } from '../utils/farcasterTimeToDate';

const onReactionRemove = async (messages: ReactionRemoveMessage[]) => {
  for (const message of messages) {
    await db
      .updateTable('reactions')
      .where('fid', '=', message.data.fid)
      .where((eb) => {
        // Search based on the type of reaction
        if (message.data.reactionBody.targetUrl) {
          return eb.where(
            'targetUrl',
            '=',
            message.data.reactionBody.targetUrl
          );
        } else if (message.data.reactionBody.targetCastId) {
          return eb
            .where('targetFid', '=', message.data.reactionBody.targetCastId.fid)
            .where(
              'targetHash',
              '=',
              message.data.reactionBody.targetCastId.hash
            );
        } else {
          throw new Error('Reaction had neither targetUrl nor targetCastId');
        }
      })
      .set({ deletedAt: farcasterTimeToDate(message.data.timestamp) })
      .execute();

    // Implement any additional logic here, such as CastHooks queries
  }
};

export { onReactionRemove };
