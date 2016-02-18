//imports
import os from "os";
import path from "path";
import child_process from "child_process";
import * as fs from "justo-fs";

/**
 * Task operation.
 */
export default function op(params) {
  var cmd, args = [], exit;

  //(1) arguments
  if (params.length === 0) {
    params = {files: []};
  } else if (params.length >= 1) {
    params = params[0];
  }

  if (!params.files) params.files = [];
  if (params.src) params.files.push({src: params.src, dst: params.dst});
  if (!params.hasOwnProperty("output")) params.output = true;

  //(2) determine command
  if (/^win/.test(os.platform())) cmd = "lessc.cmd";
  else cmd = "lessc";

  //(3) run
  for (let item of params.files) {
    if (typeof(item.src) == "string") item.src = [item.src];

    for (let src of item.src) {
      let entry = fs.entry(src);

      if (entry instanceof fs.File) compileFile(entry.path, item.dst);
      else if (entry instanceof fs.Dir) compileDir(entry, item.dst);
    }
  }

  //(4) return
  return exit;

  //helpers
  function compileFile(src, dst) {
    var res;

    //destination?
    if (dst.endsWith("/")) {
      if (src.endsWith(".css")) dst = path.join(dst, path.basename(src));
      else dst = path.join(dst, path.basename(src, path.extname(src)) + ".css");
    }

    //exec
    res = child_process.spawnSync(cmd, args.concat([src, dst]));

    //check result
    if (params.output) {
      let msg;

      msg = res.stdout.toString();
      if (msg !== "") console.log(msg);

      msg = res.stderr.toString();
      if (msg !== "") console.log(msg);
    }

    if (exit === undefined) exit = res.status;
    else if (exit === 0) exit = res.status;
  }

  function compileDir(src, dst) {
    for (let entry of src.entries) {
      if (entry instanceof fs.File) compileFile(entry.path, dst);
      else compileDir(entry, dst);
    }
  }
}
