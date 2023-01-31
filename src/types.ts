export type doc_generator_options = {
    template?: string;
    target: string;
    configFile?: string;
    config?: Record<string, any>;
    projects?: projects_definition;
    [key: string]: any;
}

export type projects_definition = Record<string, Omit<project_definition, 'name'>>;

export type project_definition = {
    name: string;
    sources?: sources;
    outputs?: outputs;
    config?: Record<string, any>;
}

export type artefacts = artefact[];
export type artefact = {
    type: string;
    path?: string;
    metas?: artefact_metas;
}
export type artefact_metas = Record<string, Omit<artefact_meta, 'name'>>;
export type artefact_meta = {
    value?: any;
}
export type sources = Record<string, Omit<source, 'id'>>;
export type outputs = Record<string, Omit<output, 'id'>>;

export type source_context = {
    root: string;
    project: project_definition;
}

export type output_context = {
    root: string;
    project: project_definition;
}

export type fetched_model = {
    types: model_types;
}
export type optimized_model = {
}
export type finalized_model = {
    types?: model_types;
}
export type model = finalized_model;
export type model_types = Record<string, Omit<model_type, 'name'>>;
export type model_type = {
    name: string;
}
export type file_tree = {
}
export type source = {
    id: string;
    type: string;
    config?: source_config;
}
export type output = {
    id: string;
    type: string;
    config?: output_config;
}
export type source_config = Record<string, any>;
export type output_config = Record<string, any>;

export type model_context_value = {
    model: model;
};
export type model_type_context_value = {
    type: model_type;
    name: string;
};