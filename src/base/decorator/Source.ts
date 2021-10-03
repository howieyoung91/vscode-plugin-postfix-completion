import { Range } from "vscode";

export namespace Source {
  /**
   * 获取到全部文本
   */
  export function Document(): MethodDecorator {
    return function (
      target: any,
      methodName: any,
      descriptor: TypedPropertyDescriptor<any>
    ) {
      const realMethod = descriptor.value;
      descriptor.value = (lineText: string, datas: {}) => {
        let source = lineText;
        source = datas["document"].getText();
        return realMethod(source, datas);
      };
    };
  }
  /**
   * 获取到某个指定行的文本
   * @param lineNumber 指定行号
   */
  export function LineTextAt(lineNumber: number): MethodDecorator {
    return function (
      target: any,
      methodName: any,
      descriptor: TypedPropertyDescriptor<any>
    ) {
      const realMethod = descriptor.value;
      descriptor.value = (lineText: string, datas: {}) => {
        let source = lineText;
        try {
          source = datas["document"].lineAt(lineNumber).text;
          return realMethod(source, datas);
        } catch (e) {
          // 防止 lineNumber 溢出
          return null;
        }
      };
    };
  }
  /**
   * 获取到某个区间之内的文本
   * @param startLineNumber 起始行
   * @param endLineNumber 结束行 -1 表示到文件结尾
   */
  export function DocumentBetween(
    startLineNumber: number,
    endLineNumber: number,
    limit?: number
  ): MethodDecorator {
    return function (
      target: any,
      methodName: any,
      descriptor: TypedPropertyDescriptor<any>
    ) {
      const realMethod = descriptor.value;
      descriptor.value = (lineText: string, datas: {}) => {
        let document = datas["document"];
        let realStartLineNumber = startLineNumber;
        let realEndLineNumber = endLineNumber;
        
        if (realStartLineNumber < 0) {
          realStartLineNumber = 0;
        }
        if (realEndLineNumber < 0) {
          realEndLineNumber = document.lineCount;
        }
        // 是否超过上限
        if (limit) {
          if (Math.abs(realEndLineNumber - realStartLineNumber) > limit) {
            return null;
          }
        }
        let source = lineText;
        try {
          source = document.getText(
            new Range(realStartLineNumber, 0, realEndLineNumber, 0)
          );
          return realMethod(source, datas);
        } catch (e) {
          // 防止 lineNumber 溢出
          return null;
        }
      };
    };
  }
}
