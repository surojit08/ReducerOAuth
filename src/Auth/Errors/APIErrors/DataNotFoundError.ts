class DataNotFoundError extends Error {
  constructor(message?:string) {
    super(message ?? "No data found");
  }
}

export default DataNotFoundError;
