import {IdRegistryEvent} from '@farcaster/hub-nodejs';
import {db} from '../db/connection';

const onIdRegistryEvent = async (event: IdRegistryEvent) => {
    await db
        .insertInto('fids')
        .values({fid: event.fid, custodyAddress: event.to})
        .onConflict((oc) => oc.columns(['fid']).doUpdateSet({custodyAddress: event.to, updatedAt: new Date()}))
        .execute();
}

export {onIdRegistryEvent};
