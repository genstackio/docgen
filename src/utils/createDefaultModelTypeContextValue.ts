import { model_type_context_value } from '../types';

export function createDefaultModelTypeContextValue(): model_type_context_value {
    return {
        type: {name: ''},
        name: '',
    };
}

export default createDefaultModelTypeContextValue;
