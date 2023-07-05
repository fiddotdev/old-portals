const safeUnwrapForHubEvent = <T>(func: () => T): T | 'undefined' => {
  try {
    return func();
  } catch {
    // TODO: Add error logging here
    return 'undefined';
  }
};

export { safeUnwrapForHubEvent };
