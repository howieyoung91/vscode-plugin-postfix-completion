import BasePostfix from "../abs/BasePostfix";
import IfPostfixHandler4J from "./handler/IfPostfixHandler4J";

export default class IfPostfix4J extends BasePostfix {
  constructor() {
    super(new IfPostfixHandler4J(), `if`);
  }
}
