export function Html({children}: HtmlProps) {
    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="styles.css"></link>
                <title>My app</title>
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}

export interface HtmlProps {
    children?: any;
}

export default Html;