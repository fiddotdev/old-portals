import { HubEvent } from '@farcaster/hub-nodejs';
import { SendMessageResult } from 'aws-sdk/clients/sqs';
import { env } from '../utils/envsafe';
import AWS, { SQS } from 'aws-sdk';

const sqs = new AWS.SQS({ apiVersion: env.SQS_API_VERSION });

const sendToSQS = async (message: HubEvent): Promise<SendMessageResult> => {
  const params: SQS.Types.SendMessageRequest = {
    MessageBody: JSON.stringify(message),
    QueueUrl: env.SQS_URL,
  };

  return sqs.sendMessage(params).promise();
};

export { sendToSQS };
