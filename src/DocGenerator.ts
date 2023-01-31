import {artefacts, doc_generator_options} from "./types";

export interface DocGenerator {
    generate(): Promise<artefacts>;
    getOptions(): doc_generator_options;
}

export default DocGenerator;