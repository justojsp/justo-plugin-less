//imports
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;

//suite
suite("API", function() {
  test("lint", function() {
    const less = require("../../dist/es5/nodejs/justo-plugin-less");
    less.lint.must.be.instanceOf(Function);
  });

  test("compile", function() {
    const less = require("../../dist/es5/nodejs/justo-plugin-less");
    less.compile.must.be.instanceOf(Function);
  });
})();
