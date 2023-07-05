import { hubClient } from '../utils/hubClient';
import { onIdRegistryEvent } from '../eventHandlers/onIdRegistryEvent';
import { getCastsByFidInBatchesOf } from './getCastsByFidInBatchesOf';
import { getReactionsByFidInBatchesOf } from './getReactionsByFidInBatchesOf';
import { getLinksByFidInBatchesOf } from './getLinksByFidInBatchesOf';
import { getSignersByFidInBatchesOf } from './getSignersByFidInBatchesOf';
import { getVerificationsByFidInBatchesOf } from './getVerificationsByFidInBatchesOf';
import { getUserDataByFidInBatchesOf } from './getUserDataByFidInBatchesOf';
import { onMergeMessage } from '../eventHandlers/onMergeMessage';

const processAllMessagesForFid = async (fid: number) => {
  await hubClient
    .getIdRegistryEvent({ fid })
    .then((result) => result.map((event) => onIdRegistryEvent(event)));

  for (const fn of [
    getCastsByFidInBatchesOf,
    getReactionsByFidInBatchesOf,
    getLinksByFidInBatchesOf,
    getSignersByFidInBatchesOf,
    getVerificationsByFidInBatchesOf,
    getUserDataByFidInBatchesOf,
  ]) {
    for await (const messages of fn(fid, 3_000)) {
      await onMergeMessage(messages);
    }
  }
};

export { processAllMessagesForFid };
