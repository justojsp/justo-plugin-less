//imports
import os from "os";
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

  args.push("--lint");

  //(3) run
  for (let src of params.src) {
    let entry = fs.entry(src);

    if (entry instanceof fs.Dir) lintDir(entry);
    else if (entry instanceof fs.File) lintFile(entry);
  }

  //(4) return
  return exit;

  //helpers
  function lintFile(file) {
    var res = child_process.spawnSync(cmd, args.concat(file.path));

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

  function lintDir(dir) {
    for (let entry of dir.entries) {
      if (entry instanceof fs.File) lintFile(entry);
      else lintDir(entry);
    }
  }
}
