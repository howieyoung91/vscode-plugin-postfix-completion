import Postfix from "../abs/Postfix";
import NotPostfixHandler4J from "./handler/NotPostfixHandler4J";

export default class NotPostfix4J extends Postfix {
  constructor() {
    super(new NotPostfixHandler4J(), `not`);
  }
}
