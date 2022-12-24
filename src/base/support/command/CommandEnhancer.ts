/*
 * Copyright ©2021-2022 Howie Young, All rights reserved.
 * Copyright ©2021-2022 杨浩宇，保留所有权利。
 */

import TextEditUtil from "../../../util/TextEditUtil";
import { CommandRequestAdapter, PostfixCommand } from "./PostfixCommand";
import { CommandRequest } from "./CommandRequest";

export abstract class PostfixCommandEnhancer {
    beforeCommand(postfixCommand: PostfixCommand, request: CommandRequest): void {}

    afterCommand(postfixCommand: PostfixCommand, request: CommandRequest): void {}
}

class DeleteLinePostfixCommandEnhancer extends PostfixCommandEnhancer {
    beforeCommand(postfixCommand: PostfixCommand, request: CommandRequestAdapter): void {
        const position = request.raw.getPosition();
        TextEditUtil.deleteLine(position.line);
    }
}

class DeleteWordPostfixCommandEnhancer extends PostfixCommandEnhancer {
    beforeCommand(postfixCommand: PostfixCommand, request: CommandRequestAdapter): void {
        const start = request.raw.getPosition().translate(0, -1);
        const end = request.raw.getPosition().translate(0, postfixCommand.label.length);
        TextEditUtil.deleteRange(start, end);
    }
}

const DELETE_LINE_ENHANCE = new DeleteLinePostfixCommandEnhancer();
const DELETE_WORD_ENHANCE = new DeleteWordPostfixCommandEnhancer();

export { DELETE_LINE_ENHANCE, DELETE_WORD_ENHANCE };
