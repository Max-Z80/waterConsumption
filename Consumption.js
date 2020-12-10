function Consumption() {
  this.date = null;
  this.m3 = null;

  /** Parse data from req.body
   * @param {object} body
   */
  Consumption.prototype.parse = function(body) {
    if (body) {
      if (body.consumptionDate && body.consumptionM3) {
        this.date = body.consumptionDate;
        this.m3 = body.consumptionM3;
        return;
      }
    }

    this.date = null;
    this.m3 = null;
  };

  /**
   * Get consumption as CSV line
   */
  Consumption.prototype.getAsCSV = function() {
    return this.date + ";" + this.m3 + "\n";
  };
}

module.exports = Consumption;
