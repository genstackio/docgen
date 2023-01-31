import ISource from "./ISource";
import {source_context} from './types';

export abstract class AbstractSource<C = any> implements ISource {
    constructor(config: C, context: source_context) {
        this.loadConfig(config, context);
    }
    protected loadConfig(config: C, context: source_context) {
    }

    public abstract fetch();
}

// noinspection JSUnusedGlobalSymbols
export default AbstractSource;