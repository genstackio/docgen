import AbstractOutput from "./AbstractOutput";
import {model, output_context} from "./types";
import fs from 'fs';
import {resolve, dirname} from 'path';

export type config = {
    path: string;
}

export abstract class AbstractFileOutput<C extends config = config> extends AbstractOutput<C> {
    protected path: string|undefined;
    public async process(model: model) {
        const path = this.getFilePath();

        await this.writeFile(path!, await this.build(model));

        return [
            {type: 'file', path},
        ];
    }
    protected loadConfig(config: any, context: output_context) {
        this.path = config.path.replace('{{root}}', context.root);
    }

    protected getFilePath() {
        return this.path;
    }
    protected abstract build(model: model): Promise<Buffer|string>;
    protected async writeFile(path: string, content: Buffer|string) {
        fs.mkdirSync(dirname(path), {recursive: true})
        fs.writeFileSync(resolve(path), content)
    }
}

// noinspection JSUnusedGlobalSymbols
export default AbstractFileOutput;