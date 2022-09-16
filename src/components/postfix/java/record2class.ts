/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import { PostfixHandler } from "../../../base/suggest/PostfixHandler";
import { Filter } from "../../../base/decorator/Filter";
import { EnablePostfixSuggestion } from "../../../base/decorator/Enable";
import { Return } from "../../../base/decorator/Return";
import { SnippetString } from "vscode";
import { indent } from "../../../util/DocumentUtil";
import StringUtil from "../../../util/StringUtil";

@EnablePostfixSuggestion({ language: "java", label: "record2class" })
class Record2class extends PostfixHandler {
    @Filter.Slice()
    @Filter.Validation.Contains(/record\s+\w+\s*\(.*\)/)
    @Return.Replace()
    handleTarget(replacement: string) {
        let className = Parser.className(replacement);
        let propertiesString = Parser.propertiesString(replacement);
        let propertiesArray = Parser.propertiesArray(propertiesString);
        let field = Parser.field(propertiesArray);
        let propertyObjectsArray = Parser.propertyObjectsArray(propertiesArray);
        let ctor = Parser.ctor(className, propertiesString, propertyObjectsArray);
        let methods = Parser.methods(className, propertyObjectsArray);
        return new SnippetString(`class ${className} {\n${field}\n${ctor}\n${methods}\n}`);
    }
}

@EnablePostfixSuggestion({ language: "java", label: "record2classonlyfields" })
class Record2classWithoutClass extends PostfixHandler {
    @Filter.Slice()
    @Filter.Validation.Contains(/record\s+\w+\s*\(.*\)/)
    @Return.Replace()
    handleTarget(replacement: string) {
        let className = Parser.className(replacement);
        let propertiesString = Parser.propertiesString(replacement);
        let propertiesArray = Parser.propertiesArray(propertiesString);
        let field = Parser.field(propertiesArray);
        let propertyObjectsArray = Parser.propertyObjectsArray(propertiesArray);
        let ctor = Parser.ctor(className, propertiesString, propertyObjectsArray);
        let methods = Parser.methods(className, propertyObjectsArray);
        return new SnippetString(`${field}\n${ctor}\n${methods}\n`);
    }
}

class Parser {
    static propertiesString(replacement: string) {
        return replacement.substring(replacement.indexOf("(") + 1, replacement.lastIndexOf(")"));
    }

    static className(replacement: string): string {
        let startIndex = replacement.search(/ \w+\s*\(.*\)/) + 1;
        let endIndex = -1;
        for (let i = startIndex; ; i++) {
            if (replacement[i] === "(" || replacement[i] === " ") {
                endIndex = i;
                break;
            }
        }
        return replacement.substring(startIndex, endIndex);
    }

    static propertiesArray(propertiesString: string): string[] {
        return propertiesString.split(",").map(value => {
            return value.trim().trimEnd();
        });
    }

    static field(properties: string[]): string {
        let field = "";
        for (let property of properties) {
            field += `${indent()}private ${property};\n`;
        }
        return field;
    }

    static propertyObjectsArray(propertiesArray) {
        return propertiesArray.map(value => {
            let whitespaceIndex = value.lastIndexOf(" ");
            return {
                type: value.substring(0, whitespaceIndex),
                name: value.substring(whitespaceIndex + 1),
            };
        });
    }

    static ctor(className: string, properties: string, propertiesObjectsArray): string {
        let ctor = `${indent()}public ${className}(${properties}) {\n`;
        for (let obj of propertiesObjectsArray) {
            ctor += `${indent().repeat(2)}this.${obj.name} = ${obj.name};\n`;
        }
        ctor += `${indent()}}\n`;
        return ctor;
    }

    static methods(className, propertiesObjectsArray) {
        let methods = ``;
        // getter/setter
        for (let obj of propertiesObjectsArray) {
            methods += `${indent()}public ${obj.type} get${StringUtil.UpperFirstChar(obj.name)}() {\n${indent().repeat(2)}return this.${
                obj.name
            };\n${indent()}}\n\n`;
            methods += `${indent()}public void set${StringUtil.UpperFirstChar(obj.name)}(${obj.type} ${obj.name}) {\n${indent().repeat(
                2
            )}this.${obj.name} = ${obj.name};\n${indent()}}\n\n`;
        }
        // equals 函数
        let eq = ``;
        eq += `${indent()}@Override\n${indent()}public boolean equals(Object obj) {\n${indent().repeat(
            2
        )}if (obj == this) { return true; }\n${indent().repeat(
            2
        )}if (obj == null || obj.getClass() != this.getClass()) { return false; }\n${indent().repeat(
            2
        )}${className} that = (${className}) obj;\n${indent().repeat(2)}`;
        eq += `return `;
        for (let i = 0; i < propertiesObjectsArray.length - 1; i++) {
            eq += `Objects.equals(this.${propertiesObjectsArray[i].name},that.${propertiesObjectsArray[i].name}) && `;
        }
        eq += `Objects.equals(this.${propertiesObjectsArray[propertiesObjectsArray.length - 1].name},that.${
            propertiesObjectsArray[propertiesObjectsArray.length - 1].name
        });\n${indent()}}\n`;
        methods += eq;
        methods += "\n";
        // hashcode
        let hashcode = `${indent()}@Override\n${indent()}public int hashCode() {\n${indent().repeat(2)}return Objects.hash(`;
        for (let i = 0; i < propertiesObjectsArray.length - 1; i++) {
            hashcode += `${propertiesObjectsArray[i].name}, `;
        }
        hashcode += propertiesObjectsArray[propertiesObjectsArray.length - 1].name;
        hashcode += `);\n${indent()}}\n\n`;
        methods += hashcode;

        // toString
        let toString = `${indent()}@Override\n${indent()}public String toString() {\n${indent().repeat(2)}return "${className}["+`;
        for (let i = 0; i < propertiesObjectsArray.length - 1; i++) {
            toString += `"${propertiesObjectsArray[i].name}=" + ${propertiesObjectsArray[i].name} + "," +`;
        }
        toString += `"${propertiesObjectsArray[propertiesObjectsArray.length - 1].name}=" + ${
            propertiesObjectsArray[propertiesObjectsArray.length - 1].name
        } + ']';`;
        toString += `\n${indent()}}\n`;
        methods += toString;
        return methods;
    }
}
