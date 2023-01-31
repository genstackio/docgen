import React from 'react';
import templates from './templates';

export function Page({template, ...props}: PageProps) {
    const Comp = templates[template];

    return <Comp {...props} />;
}

export interface PageProps {
    template: string;
}

// noinspection JSUnusedGlobalSymbols
export default Page;