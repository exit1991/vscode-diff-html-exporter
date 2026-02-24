declare module '@profoundlogic/hogan' {
  export interface Context {
    [key: string]: any;
  }

  export interface Partials {
    [key: string]: Template | string;
  }

  export interface Template {
    render(context: Context, partials?: Partials): string;
  }

  export interface Compiler {
    compile(text: string, options?: any): Template;
  }

  export function compile(text: string, options?: any): Template;
  export function scan(text: string, delimiters?: string): any[];
  export function parse(tokens: any[], text: string, options?: any): any;
  export function cache(key: string, text?: string, options?: any): Template;
}
