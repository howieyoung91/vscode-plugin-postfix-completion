import Postfix from "../abs/Postfix";
import ForPostfixHandler4J from "./handler/ForPostfixHandler4J";

export default class ForPostfix4J extends Postfix {
  constructor() {
    super(new ForPostfixHandler4J(), `for`);
  }
}
