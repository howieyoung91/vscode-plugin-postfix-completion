import BasePostfix from "../abs/BasePostfix";
import ForPostfixHandler4J from "./handler/ForPostfixHandler4J";

export default class ForPostfix4J extends BasePostfix {
  constructor() {
    super(new ForPostfixHandler4J(), `for`);
  }
}
