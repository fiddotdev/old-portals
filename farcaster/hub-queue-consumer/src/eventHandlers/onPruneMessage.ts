import { Message } from '@farcaster/hub-nodejs';
import { storeMessages } from './storeMessages';

const onPruneMessage = async (messages: Message[]) => {
  storeMessages(messages, 'prune').then(() => {
    console.log(`Successfully pruned ${messages.length} messages`);
  });
};

export { onPruneMessage };
