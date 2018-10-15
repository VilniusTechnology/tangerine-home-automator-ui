const moment = require('moment');


const lightPositions = [
    {"timestamp": 1539504776, "lightlvl": 68.55,},
    {"timestamp": 1539504777, "lightlvl": 68.55,},
    {"timestamp": 1539504778, "lightlvl": 68.55,},
    {"timestamp": 1539504779, "lightlvl": 68.55,},
    {"timestamp": 1539504780, "lightlvl": 68.55,},
    {"timestamp": 1539504781, "lightlvl": 68.55,},
    {"timestamp": 1539504782, "lightlvl": 68.55,},
    {"timestamp": 1539504783, "lightlvl": 68.55,},
    {"timestamp": 1539504784, "lightlvl": 68.55,},
    {"timestamp": 1539504785, "lightlvl": 68.55,},
    {"timestamp": 1539504786, "lightlvl": 68.55,},
    {"timestamp": 1539504787, "lightlvl": 68.55,},
    {"timestamp": 1539504788, "lightlvl": 68.55,},
    {"timestamp": 1539504789, "lightlvl": 68.55,},
    {"timestamp": 1539504790, "lightlvl": 68.55,},
  ];
  

  let counter = 0;

  function updateMarket() {
    const diff = Math.floor(Math.random() * 1000) / 100;
    const lastDay = lightPositions[0].date + 1;

    let timestamp;
    let lightlvl;
  
    timestamp = lightPositions[0].timestamp + 1;
    if (counter % 2 === 0) {
      lightlvl = lightPositions[0].lightlvl + diff;
    } else {
      lightlvl = Math.abs(lightPositions[0].lightlvl - diff);
    }
  
    lightPositions.unshift({
      timestamp,
      lightlvl,
    });
    counter++;
  }

  module.exports = {
    lightPositions,
    updateMarket,
  };