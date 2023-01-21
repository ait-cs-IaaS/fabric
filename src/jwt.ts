export class JWT {
  payload: any;

  constructor(private token: string) {
    this.payload = this.jwt_decode(token);
  }

  base64urlDecode(str: string) {
    const Buffer = require("buffer/").Buffer;
    return Buffer.from(this.base64urlUnescape(str), "base64").toString();
  }

  base64urlUnescape(str: string) {
    str += new Array(5 - (str.length % 4)).join("=");
    return str.replace(/-/g, "+").replace(/_/g, "/");
  }

  jwt_decode(token: string) {
    if (!token) {
      throw new Error("No token supplied");
    }

    const segments = token.split(".");
    if (segments.length !== 3) {
      throw new Error("Not enough or too many segments");
    }

    // All segment should be base64
    const payloadSeg = segments[1];

    const payload = JSON.parse(this.base64urlDecode(payloadSeg));

    return payload;
  }
}
