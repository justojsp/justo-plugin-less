//imports
const path = require("path");
const suite = require("justo").suite;
const test = require("justo").test;
const op = require("../../../dist/es5/nodejs/justo-plugin-less/lib/lint").default;

//suite
suite("#op()", function() {
  const DATA_DIR = "test/unit/data";

  test("op(config) - One file with valid code", function() {
    op([{
      src: path.join(DATA_DIR, "valid/style1.less")
    }]).must.be.eq(0);
  });

  test("op(config) - several files with valid code", function() {
    op([{
      src: [path.join(DATA_DIR, "valid/style1.less"), path.join(DATA_DIR, "style2.less")]
    }]).must.be.eq(0);
  });

  test("op(config) - One file with invalid code", function() {
    op([{
      src: path.join(DATA_DIR, "invalid/style1.less")
    }]).must.not.be.eq(0);
  });

  test("op(config) - Several files with valid, invalid code", function() {
    op([{
      src: [path.join(DATA_DIR, "valid/style1.less"), path.join(DATA_DIR, "invalid/style1.less")]
    }]).must.not.be.eq(0);
  });

  test("op(config) - One file with invalid code and with output:false", function() {
    op([{
      src: path.join(DATA_DIR, "invalid/style1.less"),
      output: false
    }]).must.not.be.eq(0);
  });

  test("op(config) - Several files with valid, invalid code and with output:false", function() {
    op([{
      src: [path.join(DATA_DIR, "valid/style1.less"), path.join(DATA_DIR, "invalid/style1.less"), path.join(DATA_DIR, "valid/style2.less")],
      output: false
    }]).must.not.be.eq(0);
  });

  test("op(config) - Directory with valid code", function() {
    op([{
      src: path.join(DATA_DIR, "valid/")
    }]).must.be.eq(0);
  });

  test("op(config) - Directory with invalid code", function() {
    op([{
      src: path.join(DATA_DIR, "invalid/")
    }]).must.not.be.eq(0);
  });

  test("op(config) - Directory with valid and invalid code", function() {
    op([{
      src: path.join(DATA_DIR)
    }]).must.not.be.eq(0);
  });
})();
