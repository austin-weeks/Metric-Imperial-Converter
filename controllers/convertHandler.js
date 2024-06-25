function ConvertHandler() {
  
  this.getNum = function(input) {
    const fracMatch = input.match(/\//g);
    if (fracMatch && fracMatch.length > 1) return 'invalid number';
    if (input.includes('/')) {
      let matches = input.match(/^([\d]*[\.]?[\d]*)\/+([\d]*[\.]?[\d]*)/);
      let calc = parseFloat(matches[1]) / parseFloat(matches[2]);
      return parseFloat(calc.toFixed(5));
    }
    const match = input.match(/^[\d]*[\.]?[\d]*/)[0];
    return match ? parseFloat(match) : 1;
  };
  
  this.getUnit = function(input) {
    const match = input.match(/[a-z]+$/i)[0].toLowerCase();
    if (!match || (
      match !== 'gal' &&
      match !== 'l' &&
      match !== 'lbs' &&
      match !== 'kg' &&
      match !== 'mi' &&
      match !== 'km'
    )) return 'invalid unit';
    return match === 'l' ? 'L' : match;
  };
  
  this.getReturnUnit = function(initUnit) {
    switch (initUnit.toLowerCase()) {
      case 'gal': return 'L';
      case 'l': return 'gal';
      case 'lbs': return 'kg';
      case 'kg': return 'lbs';
      case 'mi': return 'km';
      case 'km': return 'mi';
      default: return 'invalid unit';
    }
  };

  this.spellOutUnit = function(unit) {
    switch (unit.toLowerCase()) {
      case 'gal': return 'gallons';
      case 'l': return 'liters';
      case 'lbs': return 'pounds';
      case 'kg': return 'kilograms';
      case 'mi': return 'miles';
      case 'km': return 'kilometers';
      default: return 'invalid unit';
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let input = parseFloat(initNum);
    let conversion;
    switch (initUnit.toLowerCase()) {
      case 'gal':
        conversion = input * galToL;
        break;
      case 'l':
        conversion = input / galToL;
        break;
      case 'lbs':
        conversion = input * lbsToKg;
        break;
      case 'kg':
        conversion = input / lbsToKg;
        break;
      case 'mi':
        conversion = input * miToKm;
        break;
      case 'km':
        conversion = input / miToKm;
        break;
      default: return 'invalid number';
    }
    return parseFloat(conversion.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
  };
  
}

module.exports = ConvertHandler;
