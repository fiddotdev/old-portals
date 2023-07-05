import { getSSLHubRpcClient, HubRpcClient } from '@farcaster/hub-nodejs';
import { env } from './envsafe';

const hubClient: HubRpcClient = getSSLHubRpcClient(env.HUB_RPC_URL);

export { hubClient };
