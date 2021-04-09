import BasePostfixProvider from "../abs/BasePostfixProvider";
import PostfixProvider from "../decorator/PostfixProvider";

@PostfixProvider("python")
export default class PythonPostfixProvider extends BasePostfixProvider {}
