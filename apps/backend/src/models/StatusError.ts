class StatusError extends Error {
  constructor(public statusCode: number, message?: string) {
    super(message)
  }
}

export default StatusError;
