import {env} from './utils/envsafe';
import AWS from 'aws-sdk';

AWS.config.update({
    apiVersion: env.SQS_API_VERSION,
    region: env.SQS_API_VERSION,
});

(async () => {
    // Subscribe to SQS Feed

    // Stream Messages In

    // Send each one to DB
})();

export {};
