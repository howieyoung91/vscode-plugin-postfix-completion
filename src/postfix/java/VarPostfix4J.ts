import Postfix from "../abs/Postfix";
import VarPostfixHandler4J from "./handler/VarPostfixHandler4J";

export default class VarPostfix4J extends Postfix {
  constructor() {
    super(new VarPostfixHandler4J(), `var`);
  }
}
