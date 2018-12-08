function APIResult(code, result, message) {
  this.code = code;
  this.result = result;
  this.message = message;
  if (this.code === null || this.code === void 0) {
    throw new Error('Code is null.');
  }
  if (this.result === null) {
    delete this.result;
  }
  if (this.message === null) {
    delete this.message;
  }
}

module.exports = {
  APIResult
};