import loadConfig from "./loadConfig";
import {doc_generator_options, project_definition} from "../types";
import mergeProjectWithCommonConfig from "./mergeProjectWithCommonConfig";

export async function processOne<T = any>(project: string, options: doc_generator_options, processor: (project: project_definition, options: doc_generator_options) => Promise<T>) {
    options.config && await loadConfig(options.config, options);

    const {projects: projectsMap = {}} = options;
    const projects = Object.entries(projectsMap).reduce((acc, [k, v]: [string, Omit<project_definition, 'name'>]) => {
        v = v || {}; // in case project is `<projectName>: ~`
        acc.push({name: k, ...v, config: {...(options.config || {}), ...(v.config || {})}});
        return acc;
    }, [] as project_definition[]).filter(x => x.name === project);

    if (!projects.length) throw new Error(`Unknown project '${project}'`);

    try {
        const projectCfg: project_definition = projects[0];
        await processor(mergeProjectWithCommonConfig(projectCfg, options.config?.common?.projects), options);
    } catch (e: any) {
        console.error(`[${project}] error: ${e.message}`);
        throw new Error(`Error(s) in doc processing for project: ${project}`);
    }
}

export default processOne;