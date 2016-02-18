"use strict";var _justo = require("justo");



var NS = "org.justojs.plugin.less";
var lint, compile;


module.exports = { 
  get lint() {
    if (!lint) lint = (0, _justo.simple)({ ns: NS, name: "lint" }, require("./lib/lint").default);
    return lint;}, 


  get compile() {
    if (!compile) compile = (0, _justo.simple)({ ns: NS, name: "compile" }, require("./lib/compile").default);
    return compile;} };