import BasePostfixProvider from "../../base/BasePostfixProvider";
import PostfixProvider from "../../base/decorator/PostfixProvider";

@PostfixProvider("cpp")
export default class CppPostfixProvider extends BasePostfixProvider {}
