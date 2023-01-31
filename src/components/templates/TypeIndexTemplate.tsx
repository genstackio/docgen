import Html from "../misc/Html";
import useModelType from "../../hooks/useModelType";

export function TypeIndexTemplate({}: TypeIndexTemplateProps) {
    const type = useModelType();

    return (
        <Html>
            <h1>{type.name.toUpperCase()}</h1>
            <h2>Microservice: {type.split('_')[0].toLowerCase()}</h2>
            <pre>{JSON.stringify(Object.keys(type.fields || {}), null,  4)}</pre>
        </Html>
    );
}

export interface TypeIndexTemplateProps {
}

// noinspection JSUnusedGlobalSymbols
export default TypeIndexTemplate;