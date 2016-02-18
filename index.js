//imports
import {simple} from "justo";

//internal data
const NS = "org.justojs.plugin.less";
var lint, compile;

//api
module.exports = {
  get lint() {
    if (!lint) lint = simple({ns: NS, name: "lint"}, require("./lib/lint").default);
    return lint;
  },

  get compile() {
    if (!compile) compile = simple({ns: NS, name: "compile"}, require("./lib/compile").default);
    return compile;
  }
};
