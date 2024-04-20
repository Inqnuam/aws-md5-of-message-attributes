const { createHash } = require("crypto");

function md5(contents) {
  return createHash("md5").update(contents).digest("hex");
}

const MALLOC_STRING_OR_NUMBER_TYPE = 1;
const MALLOC_TRANSPORT = 1;
const MALLOC_BINARY_TYPE = 2;
const MALLOC_ENTRYNAME = 4;

function md5OfMessageAttributes(MessageAttributes) {
  const buffers = [];
  const keys = Object.keys(MessageAttributes).sort();

  for (const key of keys) {
    const { DataType, StringValue, BinaryValue } = MessageAttributes[key];

    const nameSize = Buffer.alloc(MALLOC_ENTRYNAME);
    nameSize.writeUInt32BE(key.length);

    const name = Buffer.from(key, "utf-8");

    const typeSize = Buffer.alloc(MALLOC_ENTRYNAME);
    typeSize.writeUInt32BE(DataType.length);

    const type = Buffer.from(DataType, "utf-8");

    const transporter = Buffer.alloc(MALLOC_TRANSPORT);
    transporter.writeUInt8(BinaryValue ? MALLOC_BINARY_TYPE : MALLOC_STRING_OR_NUMBER_TYPE);

    const valueSize = Buffer.alloc(MALLOC_ENTRYNAME);
    let value;

    if (DataType.startsWith("Binary")) {
      value = Buffer.from(BinaryValue, "base64");
      valueSize.writeUInt32BE(value.byteLength);
    } else {
      valueSize.writeUInt32BE(StringValue.length);
      value = Buffer.from(StringValue, "utf-8");
    }

    buffers.push(Buffer.concat([nameSize, name, typeSize, type, transporter, valueSize, value]));
  }

  return md5(Buffer.concat(buffers));
}

module.exports = {
  md5OfMessageAttributes,
};
