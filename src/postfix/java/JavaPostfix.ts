import BasePostfix from "../abs/BasePostfix";
export default abstract class JavaPostfix extends BasePostfix {
  protected constructor(labelName: string, triggerCharacters: string) {
    super("java", labelName, triggerCharacters);
  }
}
