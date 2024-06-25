const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  test('whole number input', () => {
    assert.strictEqual(convertHandler.getNum('3mi'), 3);
  });
  test('decimal input', () => {
    assert.strictEqual(convertHandler.getNum('2.12kg'), 2.12);
  });
  test('fractional input', () => {
    assert.strictEqual(convertHandler.getNum('3/5km'), 3 / 5);
  });
  test('fractional input with decimal', () => {
    assert.strictEqual(convertHandler.getNum('3/1.2gal'), 3 / 1.2);
  });
  test('error on double fraction', () => {
    assert.strictEqual(convertHandler.getNum('3/2/1mi'), 'invalid number');
  });
  test('no input num', () => {
    assert.strictEqual(convertHandler.getNum('mi'), 1);
  });
  test('correct input units', () => {
    assert.strictEqual(convertHandler.getUnit('3gal'), 'gal');
    assert.strictEqual(convertHandler.getUnit('3l'), 'L');
    assert.strictEqual(convertHandler.getUnit('3mi'), 'mi');
    assert.strictEqual(convertHandler.getUnit('3km'), 'km');
    assert.strictEqual(convertHandler.getUnit('3lbs'), 'lbs');
    assert.strictEqual(convertHandler.getUnit('3kg'), 'kg');
  });
  test('invalid input unit', () => {
    assert.strictEqual(convertHandler.getUnit('3bh'), 'invalid unit');
  });
  test('correct return units', () => {
    assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L');
    assert.strictEqual(convertHandler.getReturnUnit('l'), 'gal');
    assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs');
    assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km');
    assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi');
  });
  test('correct spelled out string unit', () => {
    assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.strictEqual(convertHandler.spellOutUnit('l'), 'liters');
    assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms');
    assert.strictEqual(convertHandler.spellOutUnit('mi'), 'miles');
    assert.strictEqual(convertHandler.spellOutUnit('km'), 'kilometers');
  });
  const galToL = 3.78541;
  const lbsToKg = 0.453592;
  const miToKm = 1.60934;
  test('gal to l', () => {
    assert.strictEqual(convertHandler.convert('3.4', 'gal'), parseFloat((3.4 * galToL).toFixed(5)));
  });
  test('l to gal', () => {
    assert.strictEqual(convertHandler.convert('3.4', 'l'), parseFloat((3.4 / galToL).toFixed(5)));
  });
  test('mi to km', () => {
    assert.strictEqual(convertHandler.convert('3.4', 'mi'), parseFloat((3.4 * miToKm).toFixed(5)));
  });
  test('km to mi', () => {
    assert.strictEqual(convertHandler.convert('3.4', 'km'), parseFloat((3.4 / miToKm).toFixed(5)));
  });
  test('lbs to kg', () => {
    assert.strictEqual(convertHandler.convert('3.4', 'lbs'), parseFloat((3.4 * lbsToKg).toFixed(5)));
  });
  test('kg to lbs', () => {
    assert.strictEqual(convertHandler.convert('3.4', 'kg'), parseFloat((3.4 / lbsToKg).toFixed(5)));
  });
});