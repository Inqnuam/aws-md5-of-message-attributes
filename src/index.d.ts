/// <reference types="node" />
export interface IBinaryMessageAttribute {
  DataType: "Binary" | `Binary.${string}`;
  BinaryValue: string;
}
export interface IStringOrNumberMessageAttribute {
  DataType: "String" | "Number" | `String.${string}` | `Number.${string}`;
  StringValue: string;
}
export interface IMessageAttributes {
  [attributeName: string]: IStringOrNumberMessageAttribute | IBinaryMessageAttribute;
}
export function md5OfMessageAttributes(MessageAttributes: IMessageAttributes): string;
