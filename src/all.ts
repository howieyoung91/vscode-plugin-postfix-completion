import * as glob from "glob";
let files = glob.sync("./postfix/**/*.js", { cwd: __dirname });
files.forEach((path) => {
  import(path);
});
