import AbstractDirectorySource from "../AbstractDirectorySource";
import {source_context} from "../types";
import dir2obj from '@ohoareau/dir2obj';
import path from 'path';

export type config = {
    dir?: string;
};

export class MicrolibModelDirSource extends AbstractDirectorySource<config> {
    protected dir: string|undefined;
    public async fetch() {
        const models = dir2obj(path.resolve(this.dir!), {ignoreDots: true});

        return {
            types: models,
        };
    }

    protected loadConfig(config: config, context: source_context) {
        config.dir && (this.dir = config.dir);
        this.dir = (config.dir ||  '{{root}}/models').replace('{{root}}', context.root);
    }
}

// noinspection JSUnusedGlobalSymbols
export default MicrolibModelDirSource;