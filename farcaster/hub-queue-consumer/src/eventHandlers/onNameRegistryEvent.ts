import {farcasterTimeToDate} from '../utils/farcasterTimeToDate';
import {NameRegistryEvent} from '@farcaster/hub-nodejs';
import {db} from '../db/connection';

const onNameRegistryEvent = async (event: NameRegistryEvent) => {
    const custodyAddress = event.to;
    const expiresAt = farcasterTimeToDate(event.expiry);

    await db
        .insertInto('fnames')
        .values({
            fname: Buffer.from(event.fname).toString('utf8'),
            custodyAddress,
            expiresAt,
        })
        .onConflict((oc) => oc.columns(['fname']).doUpdateSet({custodyAddress, expiresAt, updatedAt: new Date()}))
        .execute();
}

export {onNameRegistryEvent};
