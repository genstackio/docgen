import AbstractOutput from "./AbstractOutput";
import {model, output_context} from "./types";
import fs from "fs";
import {dirname, resolve} from "path";
import Stream from "stream";
import { renderToPipeableStream } from 'react-dom/server';
import ejs from 'ejs';
import {exec} from 'child_process';
import CommandError from "./errors/CommandError";
import App from "./components/App";

export type config = {
    dir?: string;
}
export type files = Record<string, file>;
export type file = string|Buffer|(() => string|Buffer)|(() => Promise<string|Buffer>);
export abstract class AbstractDirectoryOutput<C extends config = config> extends AbstractOutput<C> {
    protected dir: string|undefined;
    public async process(model: model) {
        const path = this.getDirPath();

        await this.preProcess(model);
        const files = await this.build(model);
        await this.writeFiles(path!, files);
        await this.postProcess(model);

        return Object.keys(files).map(f => ({type: 'file', path: `${path}/${f}`}));
    }
    protected loadConfig(config: any, context: output_context) {
        this.dir = (config.dir || '{{root}}/doc').replace('{{root}}', context.root);
    }

    protected getDirPath() {
        return this.dir;
    }
    // noinspection JSUnusedLocalSymbols
    protected async preProcess(mode: model): Promise<void> {
    }
    protected async postProcess(mode: model): Promise<void> {
    }
    protected abstract build(model: model): Promise<files>;
    protected async writeFiles(path: string, files: files) {
        fs.mkdirSync(resolve(path), {recursive: true})
        const fileNames = Object.keys(files);
        fileNames.sort();
        const reports = await Promise.allSettled(fileNames.map(async f => {
            const fullPath = `${path}/${f}`;
            fs.mkdirSync(resolve(dirname(fullPath)), {recursive: true});
            fs.writeFileSync(resolve(fullPath), ('function' === typeof files[f]) ? await (files[f] as Function)() : await files[f]);
        }));

        const errors = reports.filter(x => x.status !== 'fulfilled').map((x: any) => x.reason);

        errors.forEach(e => console.error(e.message));
    }
    protected r(type: string, template: string, props: any = {}) {
        return async () => {
            switch (type) {
                case 'react': return this.renderReact(template, props);
                case 'ejs': return this.renderEjs(template, props);
                default: throw new Error(`Unsupported renderer '${type}'`);
            }
        };
    }
    protected async renderReact(template: string, props: any = {}) {
        return new Promise<string>((resolve, reject) => {
            const content = <App template={template} {...props} />;

            const {pipe} = renderToPipeableStream(content, {
                bootstrapScripts: ['main.js'],
                onAllReady() {
                    const s = new Stream.Writable();
                    let buffer = '';
                    s._write = data => {
                        buffer += data;
                    }
                    s.end = (() => {
                        resolve(buffer);
                    }) as any;
                    pipe(s);
                },
                onError(e: any) {
                    reject(e);
                }
            });
        });
    }
    protected renderEjs(template: string, props: any = {}) {
        return ejs.render(fs.readFileSync(`${__dirname}/../assets/templates/default/${template}.ejs`, 'utf-8'), props);
    }
    protected run(cmd: string) {
        return new Promise((resolve, reject) => {
            exec(`cd ${this.getDirPath()} && ${cmd}`, (error, stdout, stderr) => {
                if (error) {
                    reject(new CommandError(cmd, error, stdout, stderr));
                } else {
                    resolve({stdout, stderr});
                }
            });
        });
    }
}

// noinspection JSUnusedGlobalSymbols
export default AbstractDirectoryOutput;