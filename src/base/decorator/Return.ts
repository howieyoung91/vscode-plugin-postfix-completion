import { SnippetString } from "vscode";
import TargetHandleResult from "../TargetHandleResult";

interface ReturnInterval {
  startIndex?: number;
  endIndex?: number;
}

export namespace Return {
  export function Replace(returnInterval?: ReturnInterval) {
    return function (
      target: any,
      methodName: any,
      descriptor: TypedPropertyDescriptor<any>
    ) {
      const realMethod = descriptor.value;
      descriptor.value = (lineText: string, datas: {}): TargetHandleResult => {
        let res = realMethod(lineText, datas);
        let start = 0;
        let end = 0;
        if (res == null) {
          return null;
        }
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
              // 把要删除的区间附加进去
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
