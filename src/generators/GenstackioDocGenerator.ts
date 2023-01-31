import AbstractDocGenerator from "../AbstractDocGenerator";
import {
    artefacts,
    doc_generator_options, fetched_model, finalized_model, optimized_model, output,
    project_definition, source, model,
} from "../types";
import {deepMerge} from "@genstackio/deep";

export class GenstackioDocGenerator extends AbstractDocGenerator {
    constructor(project: project_definition, options: doc_generator_options) {
        super(project, options);
    }
    async generate(): Promise<artefacts> {
        const fetchedModel = await this.fetchSources();
        const optimizedModel = await this.optimizeModel(fetchedModel)
        const finalizedModel = await this.finalizeModel(optimizedModel);
        // noinspection UnnecessaryLocalVariableJS
        const artefacts = await this.outputModel(finalizedModel);

        return artefacts;
    }
    protected async fetchSources(): Promise<fetched_model> {
        const project = this.getProject();

        return (await Promise.all(Object.entries(project.sources || {}).map(async ([sourceName, source]) => this.fetchSource({id: sourceName, ...source})))).reduce((acc, m) => {
            return deepMerge(acc, m);
        }, {});
    }
    protected async fetchSource(source: source) {
        return this.createSourceProcessor(source).fetch();
    }
    protected createSourceProcessor(source: source) {
        const s = require(`${__dirname}/../sources/${source.type.slice(0, 1).toUpperCase()}${source.type.slice(1)}Source`).default;

        return new s(source, {root: `./${this.getProject().name}`, project: this.getProject()});
    }
    protected async optimizeModel(model: fetched_model): Promise<optimized_model> {
        return model;
    }
    protected async finalizeModel(model: optimized_model): Promise<finalized_model> {
        return model;
    }
    protected async outputModel(model: finalized_model): Promise<artefacts> {
        const project = this.getProject();

        return (await Promise.all(Object.entries(project.outputs || {}).map(async ([outputName, output]) => this.processOutput({id: outputName, ...output}, model)))).reduce((acc, aa) => {
            return [...acc, ...aa];
        }, [] as artefacts);

    }
    protected async processOutput(output: output, model: finalized_model) {
        return this.createOutputProcessor(output).process(model as model);
    }
    protected createOutputProcessor(output: output) {
        const c = require(`${__dirname}/../outputs/${output.type.slice(0, 1).toUpperCase()}${output.type.slice(1)}Output`).default;

        return new c(output, {root: `./${this.getProject().name}`, project: this.getProject()});
    }
}

// noinspection JSUnusedGlobalSymbols
export default GenstackioDocGenerator;