import {bytesToHexString, VerificationAddEthAddressMessage} from '@farcaster/hub-nodejs';
import {db} from '../db/connection';
import {safeUnwrapForHubEvent} from '../utils/safeUnwrap';
import {farcasterTimeToDate} from '../utils/farcasterTimeToDate';

const onVerificationAddEthAddress = async (messages: VerificationAddEthAddressMessage[], isInitialCreation: Record<string, boolean>) => {
    await db
        .insertInto('verifications')
        .values(
            messages.map((message) => {
                // Unwrap each value safely prior to use
                const address = safeUnwrapForHubEvent(() => bytesToHexString(message.data.verificationAddEthAddressBody.address)._unsafeUnwrap());
                const ethSignature = safeUnwrapForHubEvent(() => bytesToHexString(message.data.verificationAddEthAddressBody.ethSignature)._unsafeUnwrap());
                const blockHash = safeUnwrapForHubEvent(() => bytesToHexString(message.data.verificationAddEthAddressBody.blockHash)._unsafeUnwrap());

                return {
                    fid: message.data.fid,
                    timestamp: farcasterTimeToDate(message.data.timestamp),
                    hash: message.hash,
                    claim: {
                        address: address,
                        ethSignature: ethSignature,
                        blockHash: blockHash,
                    },
                };
            })
        )
        // Do nothing on conflict since nothing should have changed if hash is the same.
        .onConflict((oc) => oc.columns(['hash']).doNothing())
        .execute();

    for (const message of messages) {
        const hash = bytesToHexString(message.hash);
        if (hash.isOk() && isInitialCreation[hash.value]) {
            // Do any additional queries here, such as CastHooks queries
        }
    }
}

export {onVerificationAddEthAddress};
