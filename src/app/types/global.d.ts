/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.scss' {
    interface IClassNames {
        [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg' {
    import React from 'react';

    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
    export default SVG;
}

declare const __IS_DEV__: boolean;

type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
};

declare module '*.webp' {
    const value: string;
    export default value;
}

