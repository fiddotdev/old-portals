import { hubClient } from '../utils/hubClient';
import { BackfillError } from '../types/BackfillError';
import { Message } from '@farcaster/hub-nodejs';

async function* getSignersByFidInBatchesOf(
  fid: number,
  pageSize: number
): AsyncGenerator<Message[], void, unknown> {
  let result = await hubClient.getSignersByFid({ pageSize, fid });

  for (;;) {
    if (result.isErr()) {
      throw new BackfillError('Unable to backfill', { cause: result.error });
    }

    const { messages, nextPageToken: pageToken } = result.value;

    yield messages;

    if (!pageToken?.length) break;

    result = await hubClient.getSignersByFid({ pageSize, pageToken, fid });
  }
}

export { getSignersByFidInBatchesOf };
