"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 








op;var _os = require("os");var _os2 = _interopRequireDefault(_os);var _path = require("path");var _path2 = _interopRequireDefault(_path);var _child_process = require("child_process");var _child_process2 = _interopRequireDefault(_child_process);var _justoFs = require("justo-fs");var fs = _interopRequireWildcard(_justoFs);function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;} else {var newObj = {};if (obj != null) {for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];}}newObj.default = obj;return newObj;}}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function op(params) {
  var cmd, args = [], exit;


  if (params.length === 0) {
    params = { files: [] };} else 
  if (params.length >= 1) {
    params = params[0];}


  if (!params.files) params.files = [];
  if (params.src) params.files.push({ src: params.src, dst: params.dst });
  if (!params.hasOwnProperty("output")) params.output = true;


  if (/^win/.test(_os2.default.platform())) cmd = "lessc.cmd";else 
  cmd = "lessc";var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {


    for (var _iterator = params.files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var item = _step.value;
      if (typeof item.src == "string") item.src = [item.src];var _iteratorNormalCompletion3 = true;var _didIteratorError3 = false;var _iteratorError3 = undefined;try {

        for (var _iterator3 = item.src[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {var src = _step3.value;
          var entry = fs.entry(src);

          if (entry instanceof fs.File) compileFile(entry.path, item.dst);else 
          if (entry instanceof fs.Dir) compileDir(entry, item.dst);}} catch (err) {_didIteratorError3 = true;_iteratorError3 = err;} finally {try {if (!_iteratorNormalCompletion3 && _iterator3.return) {_iterator3.return();}} finally {if (_didIteratorError3) {throw _iteratorError3;}}}}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}




  return exit;


  function compileFile(src, dst) {
    var res;


    if (dst.endsWith("/")) {
      if (src.endsWith(".css")) dst = _path2.default.join(dst, _path2.default.basename(src));else 
      dst = _path2.default.join(dst, _path2.default.basename(src, _path2.default.extname(src)) + ".css");}



    res = _child_process2.default.spawnSync(cmd, args.concat([src, dst]));


    if (params.output) {
      var msg = undefined;

      msg = res.stdout.toString();
      if (msg !== "") console.log(msg);

      msg = res.stderr.toString();
      if (msg !== "") console.log(msg);}


    if (exit === undefined) exit = res.status;else 
    if (exit === 0) exit = res.status;}


  function compileDir(src, dst) {var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {
      for (var _iterator2 = src.entries[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var entry = _step2.value;
        if (entry instanceof fs.File) compileFile(entry.path, dst);else 
        compileDir(entry, dst);}} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}}}