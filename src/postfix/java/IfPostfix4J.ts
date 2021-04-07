import Postfix from "../abs/Postfix";
import IfPostfixHandler4J from "./handler/IfPostfixHandler4J";

export default class IfPostfix4J extends Postfix {
  constructor() {
    super(new IfPostfixHandler4J(), `if`);
  }
}
