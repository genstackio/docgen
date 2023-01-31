import DocGenerator from './DocGenerator';
import {artefacts, doc_generator_options, project_definition} from "./types";

export abstract class AbstractDocGenerator implements DocGenerator {
    protected project: project_definition;
    protected options: doc_generator_options;
    protected constructor(project: project_definition, options: doc_generator_options) {
        this.project = project;
        this.options = options;
    }
    getProject(): project_definition {
        return this.project;
    }
    getOptions(): doc_generator_options {
        return this.options;
    }
    async generate(): Promise<artefacts> {
        return [];
    }
}

// noinspection JSUnusedGlobalSymbols
export default AbstractDocGenerator;