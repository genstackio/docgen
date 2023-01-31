import {artefacts, model} from "./types";

export interface IOutput {
    process(model: model): Promise<artefacts>;
}

// noinspection JSUnusedGlobalSymbols
export default IOutput;