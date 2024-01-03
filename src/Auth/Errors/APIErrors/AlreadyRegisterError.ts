class AlreadyRegisterError extends Error {
  constructor() {
    super('Email is already registered');
  }
}
export default AlreadyRegisterError;