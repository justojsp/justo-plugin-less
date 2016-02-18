[![Build Status](https://travis-ci.org/justojsp/justo-plugin-less.svg?branch=master)](https://travis-ci.org/justojsp/justo-plugin-less)

Tasks for *Less*.

*Proudly made with ♥ in Valencia, Spain, EU.*

## Install

```
npm install justo-plugin-less
```

Dependencies:

```
npm install -g less
```

## Use

```
const less = require("justo-plugin-less");
```

## lint task

This task lints *Less* code:

```
lint(opts, src : ...string) : number
lint(opts, config : object) : number
```

The `config` properties:

- `src` (string or string[]). Files to check.
- `output` (boolean). Display the `lessc` output: `true`, yep; `false`, nope. Default: `true`.

Example:

```
const lesslint = require("justo-plugin-less").lint;

lesslint("Lint Less code", {
  src: "app/styles/cover.less"
});
```

## compile task

This task compiles *Less* code:

```
compile(opts, config : object) : number
```

The `config` properties:

- `src` (string or string[]). The files to compile.
- `dst` (string). The output.
- `files` (object[]). The files to compile.
  - `src` (string or string[]). The files to compile.
  - `dst` (string). The output.
- `output` (boolean). Display the `lessc` output: `true`, yep; `false`, nope. Default: `true`.

If `src` is a directory, it compiles the directory.
If `dst` ends with `/`, the source is compiled to this directory with `.css` extension.

Example:

```
const lessc = require("justo-plugin-less").compile;

//app/styles/cover.less -> dist/styles/cover.css
lessc("Compile Less code", {
  src: "app/styles/cover.less",
  dst: "dist/styles/cover.css"
});

//app/styles/cover.less -> dist/styles/cover.css
lessc("Compile Less code", {
  src: "app/styles/cover.less",
  dst: "dist/styles/"
});

//app/styles/* -> dist/styles/*
lessc("Compile Less code", {
  src: "app/styles/",
  dst: "dist/styles/"
});

//app/styles/a.less -> dist/styles/abc.css
//app/styles/b.less -> dist/styles/cba.css
lessc("Compile Less code", {
  files: [
    {src: "app/styles/a.less", dst: "dist/styles/abc.css"},
    {src: "app/styles/b.less", dst: "dist/styles/bca.css"}
  ]
});
```
