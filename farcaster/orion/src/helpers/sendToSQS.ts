import { HubEvent } from '@farcaster/hub-nodejs';
import { env } from '../utils/envsafe';
import {
  SendMessageCommand,
  SendMessageCommandInput,
  SendMessageCommandOutput,
  SQSClient,
} from '@aws-sdk/client-sqs';

const sqsClient = new SQSClient({
  apiVersion: env.SQS_API_VERSION,
  region: env.SQS_REGION,
});

const sendToSQS = async (
  message: HubEvent
): Promise<SendMessageCommandOutput> => {
  const params: SendMessageCommandInput = {
    MessageBody: JSON.stringify(message),
    QueueUrl: env.SQS_URL,
  };

  const command = new SendMessageCommand(params);
  return sqsClient.send(command);
};

export { sendToSQS };
