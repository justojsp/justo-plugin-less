"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 







op;var _os = require("os");var _os2 = _interopRequireDefault(_os);var _child_process = require("child_process");var _child_process2 = _interopRequireDefault(_child_process);var _justoFs = require("justo-fs");var fs = _interopRequireWildcard(_justoFs);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function op(params) {
  var cmd, args = [], exit;


  if (params.length === 0) {
    params = { src: [] };} else 
  if (params.length === 1) {
    if (typeof params[0] == "string") params = { src: [params[0]] };else 
    params = params[0];} else 
  if (params.length >= 2) {
    params = { src: params };}


  if (typeof params.src == "string") params.src = [params.src];
  if (!params.hasOwnProperty("output")) params.output = true;


  if (/^win/.test(_os2.default.platform())) cmd = "lessc.cmd";else 
  cmd = "lessc";

  args.push("--lint");var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {


    for (var _iterator = params.src[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var src = _step.value;
      var entry = fs.entry(src);

      if (entry instanceof fs.Dir) lintDir(entry);else 
      if (entry instanceof fs.File) lintFile(entry);}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}



  return exit;


  function lintFile(file) {
    var res = _child_process2.default.spawnSync(cmd, args.concat(file.path));

    if (params.output) {
      var msg = undefined;

      msg = res.stdout.toString();
      if (msg !== "") console.log(msg);

      msg = res.stderr.toString();
      if (msg !== "") console.log(msg);}


    if (exit === undefined) exit = res.status;else 
    if (exit === 0) exit = res.status;}


  function lintDir(dir) {var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {
      for (var _iterator2 = dir.entries[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var entry = _step2.value;
        if (entry instanceof fs.File) lintFile(entry);else 
        lintDir(entry);}} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}}}