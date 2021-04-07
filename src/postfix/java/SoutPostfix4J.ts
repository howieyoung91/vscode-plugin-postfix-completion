import Postfix from "../abs/Postfix";
import SoutPostfixHandler4J from "./handler/SoutPostfixHandler4J";

export default class SoutPostfix4J extends Postfix {
  constructor() {
    super(new SoutPostfixHandler4J(), `sout`);
  }
}
