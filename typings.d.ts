declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

declare module '*.svg';

declare module '*.csv';

declare var Assets: any;

declare module 'query-string';