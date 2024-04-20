// @ts-check
const { describe, it } = require("node:test");
const assert = require("node:assert");
const { md5OfMessageAttributes } = require("../src");

describe("MD5 of Message Attributes", () => {
  it("compute simple attribute", () => {
    assert.equal(md5OfMessageAttributes({ attribName1: { DataType: "String", StringValue: "attribValue 1" } }), "19e27d4e946b072f3f58da80d94fd778");
  });

  it("custom attribute", () => {
    assert.equal(
      md5OfMessageAttributes({ customNumberTypeAttrib: { DataType: "Number.float", StringValue: "4563442423554324324264524243.32543234" } }),
      "9fe1b90bbd9965bdf77bac517c7d2495"
    );
  });

  it("binary attribute", () => {
    assert.equal(
      md5OfMessageAttributes({ binaryAttribute: { DataType: "Binary", BinaryValue: Buffer.from("Hello binary world!").toString("base64") } }),
      "31a92b15d92f8db860eda32aceb656c3"
    );
  });

  it("multiple attributes", () => {
    const attributes = /** @type {const} */ ({
      attribName1: { DataType: "String", StringValue: "attribValue 1" },
      customNumberTypeAttrib: { DataType: "Number.float", StringValue: "4563442423554324324264524243.32543234" },
      binaryAttribute: { DataType: "Binary", BinaryValue: Buffer.from("Hello binary world!").toString("base64") },
    });

    assert.equal(md5OfMessageAttributes(attributes), "c932db14a896c663f83c260297d594ff");
  });
});
