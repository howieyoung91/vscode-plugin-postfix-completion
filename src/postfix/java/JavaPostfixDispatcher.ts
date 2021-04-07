import PostfixDispatcher from "../abs/PostfixDispatcher";
import ForPostfix4J from "./ForPostfix4J";
import IfPostfix4J from "./IfPostfix4J";
import WhilePostfix4J from "./WhilePostfix4J";
import VarPostfix4J from "./VarPostfix4J";
import SoutPostfix4J from "./SoutPostfix4J";
import NotPostfix4J from "./NotPostfix4J";

export default class JavaPostfixDispatcher extends PostfixDispatcher {
  constructor() {
    super(`java`);
  }
}

let javaPostfixDispatcher = new JavaPostfixDispatcher();
javaPostfixDispatcher.push(new IfPostfix4J());
javaPostfixDispatcher.push(new ForPostfix4J());
javaPostfixDispatcher.push(new WhilePostfix4J());
javaPostfixDispatcher.push(new VarPostfix4J());
javaPostfixDispatcher.push(new SoutPostfix4J());
javaPostfixDispatcher.push(new NotPostfix4J());
javaPostfixDispatcher.register();
