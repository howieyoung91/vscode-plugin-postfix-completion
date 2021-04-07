import Postfix from "../abs/Postfix";
import WhilePostfixHandler4J from "./handler/WhilePostfixHandler4J";

export default class WhilePostfix4J extends Postfix {
  constructor() {
    super(new WhilePostfixHandler4J(), `while`);
  }
}
