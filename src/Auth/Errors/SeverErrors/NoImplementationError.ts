class NoImplementationError extends Error {
  constructor() {
    super("Method is not implemented");
  }
}

export default NoImplementationError;
