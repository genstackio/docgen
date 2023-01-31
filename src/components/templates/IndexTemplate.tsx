import Html from "../misc/Html";
import useModel from "../../hooks/useModel";

export function IndexTemplate({}: IndexTemplateProps) {
    const model = useModel();

    return (
        <Html>
            {Object.entries(model.types || {}).map(([id]) => <div key={id}>{id}</div>)}
        </Html>
    );
}

export interface IndexTemplateProps {
}

// noinspection JSUnusedGlobalSymbols
export default IndexTemplate;