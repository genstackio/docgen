import { createContext } from 'react';
import { model_type_context_value } from '../types';
import createDefaultModelTypeContextValue from '../utils/createDefaultModelTypeContextValue';

export const ModelTypeContext = createContext<model_type_context_value>(createDefaultModelTypeContextValue());
export const ModelTypeContextProvider = ModelTypeContext.Provider;
export const ModelTypeContextConsumer = ModelTypeContext.Consumer;

export default ModelTypeContext;
