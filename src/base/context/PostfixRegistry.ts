import BasePostfix from "../BasePostfix";

export default interface PostfixDisposableRegistry {
    // registerPostfixDisposable(postfix: Disposable): void;

    registerPostfix(language: string, postfix: BasePostfix): void;
}
