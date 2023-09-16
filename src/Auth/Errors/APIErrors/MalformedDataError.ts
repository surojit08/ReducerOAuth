class MalformedDataError extends Error {
  constructor(message) {
    super(message ?? "Data is malformed");
  }
}

export default MalformedDataError;
