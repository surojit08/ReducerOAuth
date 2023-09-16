class InvalidAccessTokenError extends Error {
  constructor() {
    super("Access token is not valid");
  }
}

export default InvalidAccessTokenError;
