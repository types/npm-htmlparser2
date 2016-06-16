import { Writable } from 'stream';
import { EventEmitter } from 'events';

export interface TokenizerOptions {
  /**
   * If set to true, entities within the document will be decoded. Defaults to false.
   */
  decodeEntities: boolean;
  /**
   * Disables the special behavior for script/style tags (false by default)
   */
  xmlMode?: boolean;
}

export interface ParserOptions extends TokenizerOptions {
  /**
   * Call .toLowerCase for each attribute name (true if xmlMode is `false`)
   */
  lowerCaseAttributeNames?: boolean;
  /**
   * Call .toLowerCase for each tag name (true if xmlMode is `false`)
   */
  lowerCaseTags?: boolean;
  /**
   * If set to true, self-closing tags will trigger the onclosetag event even if xmlMode is not set to true.
   * NOTE: If xmlMode is set to true then self-closing tags will always be recognized.
   */
  recognizeSelfClosing?: boolean;
  /***
   * If set to true, CDATA sections will be recognized as text even if the xmlMode option is not enabled.
   * NOTE: If xmlMode is set to true then CDATA sections will always be recognized as text.
   */
  recognizeCDATA?: boolean;
}

export interface ParserAttributes {
  [key: string]: string;
}

export interface Callbacks {
  oncdataend? (): any;
  oncdatastart? (): any;
  onclosetag? (tagName: string): any;
  oncomment? (comment: string): any;
  oncommentend? (): any;
  onattribute? (key: string, value: string): any;
  onerror? (err: Error): any;
  onopentag? (tagName: string, attribs: ParserAttributes): any;
  onopentagname? (tagName: string): any;
  onprocessinginstruction? (name: string, value: string): any;
  onreset? (): any;
  ontext? (text: string): any;
  onend? (): any;
}

export class Tokenizer {

  constructor (options: TokenizerOptions, cbs: Callbacks);

  write (chunk: string | Buffer): void;
  pause (): void;
  resume (): void;
  end (): void;
  reset (): void;

}

export class Parser extends EventEmitter implements Callbacks {

  constructor (cbs: Callbacks, options: ParserOptions);

  ontext (text: string): void;
  onopentagname (name: string): void;
  onopentagend (): void;
  onclosetag (name: string): void;
  onselfclosingtag (): void;
  onattribname (name: string): void;
  onattribdata (value: string): void;
  onattribend (): void;
  ondeclaration (value: string): void;
  onprocessinginstruction (value: string): void;
  oncomment (value: string): void;
  oncdata (value: string): void;
  onerror (err: Error): void;
  onend (): void;
  reset (): void;
  parseComplete (data: string): void;
  write (chunk: string): void;
  end (chunk: string): void;
  pause (): void;
  resume (): void;

  // Aliases for backward compat.
  parseChunk (chunk: string): void;
  done (chunk: string): void;

}

export class WritableStream extends Writable {

  constructor (cbs: Callbacks, options: ParserOptions);

}

export class Stream extends WritableStream {

  constructor (options: ParserOptions);

  readable: boolean;

  on (name: 'attribute', listener: (name: string, key: string, value: string) => any): this;
  on (name: 'cdatastart', listener: (name: string) => any): this;
  on (name: 'cdataend', listener: (name: string) => any): this;
  on (name: 'text', listener: (name: string, text: string) => any): this;
  on (name: 'processinginstruction', listener: (name: string, key: string, value: string) => any): this;
  on (name: 'comment', listener: (name: string, text: string) => any): this;
  on (name: 'commentend', listener: (name: string) => any): this;
  on (name: 'closetag', listener: (name: string, tagName: string) => any): this;
  on (name: 'opentag', listener: (name: string, tagName: string, attribs: ParserAttributes) => any): this;
  on (name: 'opentagname', listener: (name: string, tagName: string) => any): this;
  on (name: 'error', listener: (name: string, error: Error) => any): this;
  on (name: 'end', listener: (name: string) => any): this;
  on (name: string, listener: (...args: any[]) => any): this;

}

export class CollectingHandler implements Callbacks {

  constructor (cbs: Callbacks);

  oncdataend (): void;
  oncdatastart (): void;
  onclosetag (tagName: string): void;
  oncomment (comment: string): void;
  oncommentend (): void;
  onattribute (key: string, value: string): void;
  onerror (err: Error): void;
  onopentag (tagName: string, attribs: ParserAttributes): void;
  onopentagname (tagName: string): void;
  onprocessinginstruction (name: string, value: string): void;
  onreset (): void;
  ontext (text: string): void;
  onend (): void;
  restart (): void;

}

export var EVENTS: {
  attribute: number;
  cdatastart: number;
  cdataend: number;
  text: number;
  processinginstruction: number;
  comment: number;
  commentend: number;
  closetag: number;
  opentag: number;
  opentagname: number;
  error: number;
  end: number;
};
