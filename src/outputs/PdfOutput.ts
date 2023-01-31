import AbstractFileOutput from "../AbstractFileOutput";
import {model} from "../types";

export class PdfOutput extends AbstractFileOutput {
    protected async build(model: model) {
        return Buffer.from('');
    }
}

// noinspection JSUnusedGlobalSymbols
export default PdfOutput;