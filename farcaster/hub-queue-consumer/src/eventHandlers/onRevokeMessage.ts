import {Message} from '@farcaster/hub-nodejs';
import {storeMessages} from './storeMessages';

const onRevokeMessage = async (messages: Message[]) => {
    storeMessages(messages, 'revoke').then(() => {
        console.log(`Successfully revoked ${messages.length} messages`);
    });
}

export {onRevokeMessage}
