import {ExtensionContext} from "vscode";
import FastCompleteBootstrap from "./FastCompleteBootstrap";

export function activate(context: ExtensionContext) {
  FastCompleteBootstrap.start(context);
}

export function deactivate() {
}
