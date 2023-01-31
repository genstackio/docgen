import {fetched_model} from "./types";

export interface ISource {
    fetch(): Promise<fetched_model>;
}

// noinspection JSUnusedGlobalSymbols
export default ISource;