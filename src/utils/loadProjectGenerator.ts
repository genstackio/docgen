import {doc_generator_options, project_definition} from '../types';
import DocGenerator from "../DocGenerator";

export async function loadProjectGenerator(project: project_definition, options: doc_generator_options): Promise<DocGenerator> {
    const {template = 'default', availableDocGenerators = {}} = options;

    const tries: string[] = [
        ('default' !== template) && !!template && template.replace(/-/g, '_'),
        'default',
    ].filter(x => !!x) as string[];

    const name = tries.find((k: string) => !!availableDocGenerators[k]);

    if (!name) throw new Error(`Unknown doc generator '${template}'`);

    const g = availableDocGenerators[name];

    const generator = new g(project, options);

    if (('undefined' === typeof generator.generate) || ('undefined' === typeof generator.getOptions)) {
        throw new Error(`Generator (name: ${name}, class: ${g}) is not an instance of IDocGenerator`);
    }

    return generator;
}

// noinspection JSUnusedGlobalSymbols
export default loadProjectGenerator;