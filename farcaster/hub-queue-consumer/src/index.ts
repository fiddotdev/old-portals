import {Consumer} from 'sqs-consumer';
import {env} from './utils/envsafe';
import {
    HubEvent,
    isMergeIdRegistryEventHubEvent,
    isMergeMessageHubEvent,
    isMergeNameRegistryEventHubEvent,
    isPruneMessageHubEvent,
    isRevokeMessageHubEvent
} from '@farcaster/hub-nodejs';

const app = Consumer.create({
    queueUrl: env.SQS_URL,
    region: env.SQS_REGION,
    handleMessage: async (message) => {
        const event: HubEvent = JSON.parse(message.Body as string);

        // Process the event based on its type
        if (isMergeMessageHubEvent(event)) {

        } else if (isPruneMessageHubEvent(event)) {

        } else if (isRevokeMessageHubEvent(event)) {

        } else if (isMergeIdRegistryEventHubEvent(event)) {

        } else if (isMergeNameRegistryEventHubEvent(event)) {

        } else {
            console.warn('event something')
        }
    }
});

app.start();

export {};
