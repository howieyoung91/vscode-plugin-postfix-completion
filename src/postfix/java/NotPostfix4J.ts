import BasePostfix from "../abs/BasePostfix";
import NotPostfixHandler4J from "./handler/NotPostfixHandler4J";

export default class NotPostfix4J extends BasePostfix {
  constructor() {
    super(new NotPostfixHandler4J(), `not`);
  }
}
