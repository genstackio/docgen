import AbstractSource from "./AbstractSource";

export abstract class AbstractDirectorySource<C = any> extends AbstractSource<C> {
    public abstract fetch();
}

// noinspection JSUnusedGlobalSymbols
export default AbstractDirectorySource;