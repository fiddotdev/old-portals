import {Consumer} from 'sqs-consumer';
import {env} from './utils/envsafe';
import {
  HubEvent,
  isMergeIdRegistryEventHubEvent,
  isMergeMessageHubEvent,
  isMergeNameRegistryEventHubEvent,
  isPruneMessageHubEvent,
  isRevokeMessageHubEvent,
} from '@farcaster/hub-nodejs';
import {onMergeMessage} from './eventHandlers/onMergeMessage';
import {storeMessages} from './eventHandlers/storeMessages';
import {onPruneMessage} from './eventHandlers/onPruneMessage';
import {onRevokeMessage} from './eventHandlers/onRevokeMessage';
import {onIdRegistryEvent} from './eventHandlers/onIdRegistryEvent';
import {onNameRegistryEvent} from './eventHandlers/onNameRegistryEvent';

const app = Consumer.create({
    queueUrl: env.SQS_URL,
    region: env.SQS_REGION,
    handleMessage: async (message) => {
        const event: HubEvent = JSON.parse(message.Body as string);

        // Process the event based on its type
        if (isMergeMessageHubEvent(event)) {
            console.info(`[Sync] Processing merge event ${event.id} from stream`);
            await onMergeMessage([event.mergeMessageBody.message]);
            await storeMessages(event.mergeMessageBody.deletedMessages, 'delete');
        } else if (isPruneMessageHubEvent(event)) {
            console.info(`[Sync] Processing prune event ${event.id}`);
            await onPruneMessage([event.pruneMessageBody.message]);
        } else if (isRevokeMessageHubEvent(event)) {
            console.info(`[Sync] Processing revoke event ${event.id}`);
            await onRevokeMessage([event.revokeMessageBody.message]);
        } else if (isMergeIdRegistryEventHubEvent(event)) {
            console.info(`[Sync] Processing ID registry event ${event.id}`);
            await onIdRegistryEvent(event.mergeIdRegistryEventBody.idRegistryEvent);
        } else if (isMergeNameRegistryEventHubEvent(event)) {
            console.info(`[Sync] Processing name registry event ${event.id}`);
            await onNameRegistryEvent(event.mergeNameRegistryEventBody.nameRegistryEvent);
        } else {
            console.warn(`[Sync] Unknown type ${event.type} of event ${event.id}. Ignoring`);
        }
    },
});

app.start();

export {};
