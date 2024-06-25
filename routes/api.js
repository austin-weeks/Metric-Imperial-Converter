'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input;
    // console.log('supplied input:', input);

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    //Input validation
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      res.send('invalid number and unit');
      return;
    } else if ( initNum === 'invalid number') {
      res.send('invalid number');
      return;
    } else if (initUnit === 'invalid unit') {
      res.send('invalid unit');
      return;
    }
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const json = {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    }
    // console.log('response:', json);
    res.json(json);
  });
};
