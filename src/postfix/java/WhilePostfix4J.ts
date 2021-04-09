import BasePostfix from "../abs/BasePostfix";
import WhilePostfixHandler4J from "./handler/WhilePostfixHandler4J";

export default class WhilePostfix4J extends BasePostfix {
  constructor() {
    super(new WhilePostfixHandler4J(), `while`);
  }
}
