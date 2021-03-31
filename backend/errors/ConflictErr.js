class ConflictErr extends Error {
  constructor(message) {
    super();
    this.message = message;
    this.statusCode = 409;
  }
}

module.exports = ConflictErr;
