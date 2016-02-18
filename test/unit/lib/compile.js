//imports
const path = require("path");
const suite = require("justo").suite;
const test = require("justo").test;
const init = require("justo").init;
const fin = require("justo").fin;
const Dir = require("justo-fs").Dir;
const file = require("justo-assert-fs").file;
const op = require("../../../dist/es5/nodejs/justo-plugin-less/lib/compile").default;

//suite
suite("#op()", function() {
  const DATA = "test/unit/data";
  var TMP, TMP_DIR;

  init("*", function() {
    TMP_DIR = Dir.createTmpDir();
    TMP = TMP_DIR.path;
  });

  fin("*", function() {
    TMP_DIR.remove();
  });

  test("op(config) - File to file", function() {
    op([{
      src: path.join(DATA, "valid/style1.less"),
      dst: path.join(TMP, "style.css")
    }]).must.be.eq(0);

    file(TMP, "style.css").must.exist();
    file(TMP, "style.css").must.contain("#header {\n  color: #5B83AD;\n}");
  });

  test("op(config) - File to dir", function() {
    op([{
      src: path.join(DATA, "valid/style1.less"),
      dst: TMP + "/"
    }]).must.be.eq(0);

    file(TMP, "style1.css").must.exist();
    file(TMP, "style1.css").must.contain("#header {\n  color: #5B83AD;\n}");
  });

  test("op(config) - Files to dir", function() {
    op([{
      src: [path.join(DATA, "valid/style1.less"), path.join(DATA, "valid/style2.less")],
      dst: TMP + "/"
    }]).must.be.eq(0);

    file(TMP, "style1.css").must.exist();
    file(TMP, "style2.css").must.exist();
  });

  test("op(config) - Invalid file", function() {
    op([{
      src: path.join(DATA, "invalid/style1.less"),
      dst: TMP + "/",
      output: false
    }]).must.not.be.eq(0);

    file(TMP, "invalid.css").must.not.exist();
    file(TMP, "invalid.less").must.not.exist();
  });

  test("op(config) - Directory with valid files", function() {
    op([{
      src: path.join(DATA, "valid/"),
      dst: TMP + "/"
    }]).must.be.eq(0);

    file(TMP, "style1.css").must.exist();
    file(TMP, "style2.css").must.exist();
  });

  test("op(config) - Directory with invalid files", function() {
    op([{
      src: path.join(DATA, "invalid/"),
      dst: TMP + "/",
      output: false
    }]).must.not.be.eq(0);

    file(TMP, "style1.css").must.not.exist();
    file(TMP, "style2.css").must.not.exist();
  });

  test("op(config) - Directory with valid, invalid files", function() {
    op([{
      src: DATA,
      dst: TMP + "/",
      output: false
    }]).must.not.be.eq(0);

    file(TMP, "style1.css").must.exist();
    file(TMP, "style2.css").must.exist();
  });
})();
