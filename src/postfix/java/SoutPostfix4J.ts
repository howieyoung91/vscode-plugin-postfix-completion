import BasePostfix from "../abs/BasePostfix";
import SoutPostfixHandler4J from "./handler/SoutPostfixHandler4J";

export default class SoutPostfix4J extends BasePostfix {
  constructor() {
    super(new SoutPostfixHandler4J(), `sout`);
  }
}
