import BasePostfix from "../abs/BasePostfix";
import VarPostfixHandler4J from "./handler/VarPostfixHandler4J";

export default class VarPostfix4J extends BasePostfix {
  constructor() {
    super(new VarPostfixHandler4J(), `var`);
  }
}
