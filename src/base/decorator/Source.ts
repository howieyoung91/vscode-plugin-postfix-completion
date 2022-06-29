import { Range } from "vscode";

/**
 * 修改源文本
 */
export namespace Source {
    /**
     * 获取到全部文本
     */
    export function Document(): MethodDecorator {
        return function (target: any, methodName: any, descriptor: TypedPropertyDescriptor<any>) {
            const realMethod = descriptor.value;
            descriptor.value = (lineText: string, data: {}) => {
                let source = data["document"].getText();
                return realMethod(source, data);
            };
        };
    }

    /**
     * 获取到某个指定行的文本
     * @param lineNumber 指定行号
     */
    export function LineTextAt(lineNumber: number): MethodDecorator {
        return function (target: any, methodName: any, descriptor: TypedPropertyDescriptor<any>) {
            const realMethod = descriptor.value;
            descriptor.value = (lineText: string, data: {}) => {
                let source = lineText;
                try {
                    source = data["document"].lineAt(lineNumber).text;
                    return realMethod(source, data);
                } catch (e) {
                    return null; // 防止 lineNumber 溢出
                }
            };
        };
    }

    /**
     * 获取到某个区间之内的文本
     * @param args
     */
    export function DocumentBetween(args: { startLineNumber: number; endLineNumber: number; limit?: number }): MethodDecorator {
        return function (target: any, methodName: any, descriptor: TypedPropertyDescriptor<any>) {
            let { startLineNumber, endLineNumber, limit } = { ...args };
            if (startLineNumber < 0) {
                startLineNumber = 0;
            }

            const realMethod = descriptor.value;
            descriptor.value = (lineText: string, data: {}) => {
                let document = data["document"];
                let realStartLineNumber = startLineNumber;
                let realEndLineNumber = endLineNumber;

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
                    source = document.getText(new Range(realStartLineNumber, 0, realEndLineNumber, 0));
                    return realMethod(source, data);
                } catch (e) {
                    // 防止 lineNumber 溢出
                    return null;
                }
            };
        };
    }
}
