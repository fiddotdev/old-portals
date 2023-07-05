import { HubError } from '@farcaster/hub-nodejs';

interface BackfillErrorProps {
  cause: HubError | undefined;
}

class BackfillError extends Error {
  public props: BackfillErrorProps | undefined;

  constructor(message?: string, props?: BackfillErrorProps) {
    super(message); // Passes the message to the Error constructor
    this.props = props;

    // This line is necessary due to how TypeScript transpiles classes
    Object.setPrototypeOf(this, BackfillError.prototype);
  }
}

export { BackfillError };
