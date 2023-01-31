import IOutput from "./IOutput";
import {model, output_context} from "./types";

export abstract class AbstractOutput<C = any> implements IOutput {
    constructor(config: C, context: output_context) {
        this.loadConfig(config, context);
    }
    // noinspection JSUnusedLocalSymbols
    protected loadConfig(config: C, context: output_context) {
    }

    public abstract process(model: model);
}

// noinspection JSUnusedGlobalSymbols
export default AbstractOutput;