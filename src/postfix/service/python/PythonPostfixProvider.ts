import BasePostfixProvider from "../../base/BasePostfixProvider";
import PostfixProvider from "../../base/decorator/PostfixProvider";

@PostfixProvider("python")
export default class PythonPostfixProvider extends BasePostfixProvider {}
