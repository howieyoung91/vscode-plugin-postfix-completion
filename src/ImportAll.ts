// command
// import("./command/HelloWorld");
// postfix
// 自动导入
import * as glob from "glob";
let files = glob.sync("./postfix/**/*.js", { cwd: __dirname });
files.forEach((path) => {
  // console.log(path);
  import(path);
});

export {};
