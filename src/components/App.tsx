import React, {useMemo} from 'react';
import Page, {PageProps} from "./Page";
import {ModelContextProvider} from "../contexts/ModelContext";
import {ModelTypeContextProvider} from "../contexts/ModelTypeContext";
import {model, model_type} from "../types";

export function App({model, type, name, ...props}: AppProps) {
    const modelContextProviderValue = useMemo(() => model ? {model} : undefined, [model]);
    const modelTypeContextProviderValue = useMemo(() => ({type: {...type, name}, name}), [type, name]);

    let content = <Page {...props} />;

    if (modelTypeContextProviderValue) content = (
        <ModelTypeContextProvider value={modelTypeContextProviderValue}>
            {content}
        </ModelTypeContextProvider>
    );

    if (modelContextProviderValue) content = (
        <ModelContextProvider value={modelContextProviderValue}>
            {content}
        </ModelContextProvider>
    );

    return content;
}

export interface AppProps extends PageProps {
    model?: model;
    type?: model_type;
    name?: string;
}

// noinspection JSUnusedGlobalSymbols
export default App;