import BasePostfixProvider from "../abs/BasePostfixProvider";
import ForPostfix4J from "./ForPostfix4J";
import IfPostfix4J from "./IfPostfix4J";
import WhilePostfix4J from "./WhilePostfix4J";
import VarPostfix4J from "./VarPostfix4J";
import SoutPostfix4J from "./SoutPostfix4J";
import NotPostfix4J from "./NotPostfix4J";
import "reflect-metadata";
import {
  TextDocument,
  Position,
  CancellationToken,
  CompletionContext,
  ProviderResult,
  CompletionItem,
  CompletionList,
} from "vscode";

// function Name() {
//   return (target: any) => {
//     Reflect.defineMetadata("temp", "java", target);
//   };
// }

// @Name()
export default class JavaPostfixProvider extends BasePostfixProvider {
  constructor() {
    super(`java`);
  }

  provideCompletionItems(
    document: TextDocument,
    position: Position,
    token: CancellationToken,
    context: CompletionContext
  ): ProviderResult<CompletionItem[] | CompletionList<CompletionItem>> {
    return super.provideCompletionItems(document, position, token, context);
  }
}

let javaPostfixProvider = new JavaPostfixProvider();
javaPostfixProvider.push(new IfPostfix4J());
javaPostfixProvider.push(new ForPostfix4J());
javaPostfixProvider.push(new WhilePostfix4J());
javaPostfixProvider.push(new VarPostfix4J());
javaPostfixProvider.push(new SoutPostfix4J());
javaPostfixProvider.push(new NotPostfix4J());
javaPostfixProvider.register();
