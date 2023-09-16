class DataNotFoundError extends Error {
  constructor(message) {
    super(message ?? "No data found");
  }
}

export default DataNotFoundError;
