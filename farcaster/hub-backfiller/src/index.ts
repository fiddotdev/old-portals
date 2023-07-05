import { hubClient } from './utils/hubClient';
import { BackfillError } from './types/BackfillError';
import fastq, { queueAsPromised } from 'fastq';
import prettyMilliseconds from 'pretty-ms';
import { processAllMessagesForFid } from './helpers/processAllMessagesForFid';
import { env } from './utils/envsafe';

const MAX_JOB_CONCURRENCY = env.MAX_CONCURRENCY;

const backfill = async () => {
  const maxFidResult = await hubClient.getFids({ pageSize: 1, reverse: true });
  if (maxFidResult.isErr())
    throw new BackfillError('Unable to backfill', {
      cause: maxFidResult.error,
    });

  const maxFid = maxFidResult.value.fids[0];
  let totalProcessed = 0;

  const startTime = Date.now();
  const queue: queueAsPromised<{ fid: number }> = fastq.promise(
    async ({ fid }) => {
      await processAllMessagesForFid(fid);

      totalProcessed += 1;
      const elapsedMs = Date.now() - startTime;
      const millisRemaining = Math.ceil(
        (elapsedMs / totalProcessed) * (maxFid - totalProcessed)
      );

      console.info(
        `[Backfill] Completed FID ${fid}/${maxFid}. Estimated time remaining: ${prettyMilliseconds(
          millisRemaining
        )}`
      );
    },
    MAX_JOB_CONCURRENCY
  );

  for (let fid = 1; fid <= maxFid; fid++) {
    queue.push({ fid });
  }

  await queue.drained();

  console.info(
    `[Backfill] Completed in ${prettyMilliseconds(Date.now() - startTime)}`
  );
};

(async () => {
  await backfill();
})();

export {};
