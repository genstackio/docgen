import { createContext } from 'react';
import { model_context_value } from '../types';
import createDefaultModelContextValue from '../utils/createDefaultModelContextValue';

export const ModelContext = createContext<model_context_value>(createDefaultModelContextValue());
export const ModelContextProvider = ModelContext.Provider;
export const ModelContextConsumer = ModelContext.Consumer;

export default ModelContext;
