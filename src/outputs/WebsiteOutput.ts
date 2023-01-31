import AbstractDirectoryOutput from "../AbstractDirectoryOutput";
import {model, model_type} from "../types";

export type config = {
    dir?: string;
}

export class WebsiteOutput extends AbstractDirectoryOutput<config> {
    protected async build(model: model) {
        return {
            'index.html': this.r('react', 'index', {model}),
            'toc.html': this.r('react', 'index', {model}),
            'main.js': this.r('ejs', 'main.js', {model}),
            ...this.iterateOver<Omit<model_type, 'name'>>(model.types || {}, (name, type) => ({[`types/${name}/index.html`]: this.r('react', 'typeIndex', {type, name, model})})),
        };
    }
    protected iterateOver<T = any>(o: Record<string, T>, fn: (k: string, value: T) => Record<string, any>) {
        return Object.entries(o).reduce((acc: Record<string, T>, [k, v]: [string, T]) => {
            return Object.assign(acc, fn(k, v) || {});
        }, {} as Record<string, T>);
    }
    protected async postProcess(mode: model): Promise<void> {
        await this.run(`npx tailwindcss -c ${__dirname}/../../resources/templates/default/tailwind.config.js -i ${__dirname}/../../resources/templates/default/styles.css.tailwind -o ./styles.css`)
    }
}

// noinspection JSUnusedGlobalSymbols
export default WebsiteOutput;