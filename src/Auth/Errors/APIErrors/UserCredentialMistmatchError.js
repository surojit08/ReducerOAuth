class UserCredentialMismatchError extends Error {
  constructor() {
    super("Credentials mismatch");
  }
}

export default UserCredentialMismatchError;
