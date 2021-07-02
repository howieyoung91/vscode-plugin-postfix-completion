import { Constructor } from "../ioc/IocContainer";
import "reflect-metadata";

export interface Interval {
  start?: string;
  end?: string;
}

export abstract class Target {
  static Interval(interval: Interval): MethodDecorator {
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
        // 加入 datas
        datas["startIndex"] = startIndex;
        datas["endIndex"] = endIndex;
        return realMethod(replacement, datas);
      };
    };
  }

  static Regex() {
    return (postfixHandlerCtor: Constructor) => {
      return null;
    };
  }
}
