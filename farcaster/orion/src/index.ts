import { env } from './utils/envsafe';
import {
  getSSLHubRpcClient,
  HubEvent,
  HubEventType,
  HubRpcClient,
} from '@farcaster/hub-nodejs';
import AWS from 'aws-sdk';
import { sendToSQS } from './helpers/sendToSQS';

AWS.config.update({
  apiVersion: env.SQS_API_VERSION,
  region: env.SQS_API_VERSION,
});

(async () => {
  const client: HubRpcClient = getSSLHubRpcClient(env.HUB_RPC_URL);

  const subResult = await client.subscribe({
    eventTypes: [
      HubEventType.MERGE_ID_REGISTRY_EVENT,
      HubEventType.MERGE_NAME_REGISTRY_EVENT,
      HubEventType.MERGE_MESSAGE,
      HubEventType.PRUNE_MESSAGE,
      HubEventType.REVOKE_MESSAGE,
    ],
  });

  if (subResult.isOk()) {
    const stream = subResult.value;

    for await (const anyEvent of stream) {
      const event = anyEvent as HubEvent;

      sendToSQS(event)
        .then((response) => {
          console.log(`Message sent to SQS Queue: ${response.MessageId}`);
        })
        .catch((e) => {
          console.error(`Failed to send message to the SQS Queue: ${e}`);
        });
    }
  } else {
    throw new Error('Client failed to subscribe to stream');
  }
})();

export {};
