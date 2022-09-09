const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { secret } = require("../controllers/token");

const updateLatex = async (tex, json) => {
  var jsonAct = JSON.parse(json);
  var keys = Object.keys(jsonAct);
  var res = ``;
  for (let i = 0; i < keys.length; i++) {
    var section = jsonAct[Object.keys(jsonAct)[i]];
    var blockElems = {};
    for (let j = 0; j < section.length; j++) {
      var block = section[Object.keys(section)[j]];
      var blockFields = block[Object.keys(block)[0]];
      var blockKeys = Object.keys(blockFields);
      for (let b = 0; b < blockKeys.length; b++) {
        // var index = tex.indexOf(blockKeys[b].replace("_", ""));
        if (i === 0) {
          res += `\\renewcommand{\\${blockKeys[b].replace("_", "")}}{${blockFields[blockKeys[b]]}} \n`;
        } else {
            var dt = blockFields[blockKeys[b]];
            if(blockKeys[b].indexOf("date") !== -1) dt = [new Date(dt).getFullYear(), new Date(dt).getMonth()].join(" / ");
            if(blockElems[blockKeys[b]]) blockElems[blockKeys[b]] = [...blockElems[blockKeys[b]], dt];
            else blockElems[blockKeys[b]] = [dt];
        }
      }
    }
    if(i !== 0) {
        var blockElemsKeys = Object.keys(blockElems);
        for (let c = 0; c < blockElemsKeys.length; c++) {
            // blockElems[blockElemsKeys[c]].join(",")
            res += `\\renewcommand\\${blockElemsKeys[c].replaceAll("_", "")}s{${blockElems[blockElemsKeys[c]].join(",")}} \n`;
        }
    }
  }
    var st = tex.indexOf("%INSERTHERE%");
    var nd = tex.indexOf("%TOHERE%");
    console.log(nd);
    var start = tex.substring(0, st + 13);
    var end = tex.substring(nd);
    return start + res + end;
};

module.exports = { updateLatex };
