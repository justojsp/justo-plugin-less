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
    params = {src: []};
  } else if (params.length === 1) {
    if (typeof(params[0]) =="string") params = {src: [params[0]]};
    else params = params[0];
  } else if (params.length >= 2) {
    params = {src: params};
  }

  if (typeof(params.src) == "string") params.src = [params.src];
  if (!params.hasOwnProperty("output")) params.output = true;

  //(2) determine command
  if (/^win/.test(os.platform())) cmd = "lessc.cmd";
  else cmd = "lessc";

  if (params.compress) args.push("--compress");

  //(3) run
  for (let src of params.src) {
    let entry = fs.entry(src);

    if (entry instanceof fs.Dir) compileDir(entry);
    else if (entry instanceof fs.File) compileFile(entry);
  }

  //(4) return
  return exit;

  //helpers
  function compileFile(file) {
    var res, dst;

    //file as string
    file = file.path;

    //destination?
    if (params.dst.endsWith("/")) {
      if (file.endsWith(".css")) dst = path.join(params.dst, file);
      else dst = path.join(params.dst, path.basename(file, path.extname(file)) + ".css");
    } else {
      dst = params.dst;
    }

    //exec
    res = child_process.spawnSync(cmd, args.concat([file, dst]));

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

  function compileDir(dir) {
    for (let entry of dir.entries) {
      if (entry instanceof fs.File) compileFile(entry);
      else compileDir(entry);
    }
  }
}
