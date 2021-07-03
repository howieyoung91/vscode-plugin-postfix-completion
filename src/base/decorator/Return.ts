import {SnippetString} from "vscode";
import LineTextHandleResult from "../LinetextHandleResult";

export interface ReturnInterval {
  startIndex?: number;
  endIndex?: number;
}

export namespace Return {
  export function DeleteText(returnInterval: ReturnInterval) {
    return function (
      target: any,
      methodName: any,
      descriptor: TypedPropertyDescriptor<any>
    ) {
      const realMethod = descriptor.value;
      descriptor.value = (
        lineText: string,
        datas: {}
      ): LineTextHandleResult => {
        let res = realMethod(lineText, datas);
        // enhance result
        switch (typeof res) {
          case "object":
            if (res instanceof SnippetString) {
              res = {
                text: res,
                deleteText: {
                  startIndex: datas["startIndex"],
                  endIndex: datas["endIndex"] + 1,
                },
              };
            } else {
              res.deleteText = {
                startIndex: datas["startIndex"],
                endIndex: datas["endIndex"] + 1,
              };
            }
            break;
          case "string":
            res = {
              text: res,
              deleteText: {
                startIndex: datas["startIndex"],
                endIndex: datas["endIndex"] + 1,
              },
            };
            break;
        }
        // return result
        return res;
      };
    };
  }
}
