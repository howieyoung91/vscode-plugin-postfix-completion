export interface TargetInterval {
  start?: string;
  end?: string;
}

export interface TargetRegex {
  regex: RegExp;
  end?: string;
}

export namespace Target {
  export function Interval(interval: TargetInterval): MethodDecorator {
    return function (
      target: any,
      methodName: any,
      descriptor: TypedPropertyDescriptor<any>
    ) {
      //接受参数为当前类 和 接受参数为当前方法名称  和  方法的描述
      const realMethod = descriptor.value;
      descriptor.value = (lineText: string, datas: {}) => {
        let startIndex, endIndex;
        if (interval.start) {
          startIndex = lineText.lastIndexOf(interval.start);
        } else {
          startIndex = datas["firstNotWhiteSpaceIndex"];
        }
        if (interval.end) {
          endIndex = lineText.lastIndexOf(interval.end);
        } else {
          endIndex = lineText.lastIndexOf(".");
        }
        const replacement = lineText.substring(startIndex, endIndex).trimEnd();
        if (replacement.length == 0) {
          return null;
        }
        // 加入 datas
        datas["startIndex"] = startIndex;
        datas["endIndex"] = endIndex;
        return realMethod(replacement, datas);
      };
    };
  }

  export namespace Regex {
    export function Search(targetRegex: TargetRegex) {
      return function (
        target: any,
        methodName: any,
        descriptor: TypedPropertyDescriptor<any>
      ) {
        if (!targetRegex.regex) {
          return null;
        }
        const realMethod = descriptor.value;
        descriptor.value = (lineText: string, datas: {}) => {
          const startIndex = lineText.search(targetRegex.regex);
          if (startIndex == -1) {
            return null;
          }
          if (!targetRegex.end) {
            targetRegex.end = ".";
          }
          const endIndex = lineText.lastIndexOf(targetRegex.end);
          const replacement = lineText.substring(startIndex, endIndex);
          if (replacement.length == 0) {
            return null;
          }
          datas["startIndex"] = startIndex;
          datas["endIndex"] = endIndex;
          return realMethod(replacement, datas);
        };
      };
    }

    // !BUG
    export function Match(targetRegex: TargetRegex) {
      return function (
        target: any,
        methodName: any,
        descriptor: TypedPropertyDescriptor<any>
      ) {
        if (!targetRegex.regex) {
          return null;
        }
        const realMethod = descriptor.value;
        descriptor.value = (lineText: string, datas: {}) => {
          if (!targetRegex.end) {
            targetRegex.end = ".";
          }
          const startIndex = datas["firstNotWhiteSpaceIndex"];
          const endIndex = lineText.lastIndexOf(targetRegex.end);
          let matchedArray = lineText
            .substring(datas["firstNotWhiteSpaceIndex"], endIndex)
            .match(targetRegex.regex);
          if (!matchedArray || matchedArray.length == 0) {
            return null;
          }
          const replacement = matchedArray[0];
          datas["startIndex"] = startIndex;
          datas["endIndex"] = endIndex;
          return realMethod(replacement, datas);
        };
      };
    }
  }
}
