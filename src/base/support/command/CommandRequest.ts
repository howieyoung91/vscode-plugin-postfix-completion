import { AbstractRequest } from "../Request";

export class CommandRequest extends AbstractRequest {
    private _args: any[];

    get args(): any[] {
        return this._args;
    }
}
