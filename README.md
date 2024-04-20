# AWS MD5 of Message Attributes

> Compute the MD5 hash of AWS SQS Message Attributes

![Diagram - Calculating the MD5 message digest for message attributes](https://raw.githubusercontent.com/Inqnuam/aws-md5-of-message-attributes/main/resources/diagram.png)

### Install

```bash
npm i aws-md5-of-message-attributes
```

### Usage examples:

```js
const { md5OfMessageAttributes } = require("aws-md5-of-message-attributes");

const simpleAttribute = { attribName1: { DataType: "String", StringValue: "attribValue 1" } };
md5OfMessageAttributes(simpleAttribute); // 19e27d4e946b072f3f58da80d94fd778

const withCustomAttributeType = { customNumberTypeAttrib: { DataType: "Number.float", StringValue: "4563442423554324324264524243.32543234" } };
md5OfMessageAttributes(withCustomAttributeType); // 9fe1b90bbd9965bdf77bac517c7d2495

const binaryAttribute = { binaryAttribute: { DataType: "Binary", BinaryValue: Buffer.from("Hello binary world!").toString("base64") } };
md5OfMessageAttributes(binaryAttribute); // 31a92b15d92f8db860eda32aceb656c3

const multipleAttributes = {
  attribName1: { DataType: "String", StringValue: "attribValue 1" },
  customNumberTypeAttrib: { DataType: "Number.float", StringValue: "4563442423554324324264524243.32543234" },
  binaryAttribute: { DataType: "Binary", BinaryValue: Buffer.from("Hello binary world!").toString("base64") },
};
md5OfMessageAttributes(multipleAttributes); // c932db14a896c663f83c260297d594ff
```

Resources:

- [Calculating the MD5 message digest for message attributes](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html#sqs-attributes-md5-message-digest-calculation)
