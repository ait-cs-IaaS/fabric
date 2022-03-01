type Creds = {
    target: string,
    username: string | null,
    password: string | null
}

const urlSearchParams = new URLSearchParams(window.location.search);
const hasAuth: boolean = urlSearchParams.has("auth");
const hasTarget: boolean = urlSearchParams.has("target");


function base64urlDecode(str: string) {
  return Buffer.from(base64urlUnescape(str), 'base64').toString();
}

function base64urlUnescape(str: string) {
  str += new Array(5 - str.length % 4).join('=');
  return str.replace(/\-/g, '+').replace(/_/g, '/');
}

function jwt_decode(token: string) {
  if (!token) {
    throw new Error('No token supplied');
  }

  var segments = token.split('.');
  if (segments.length !== 3) {
    throw new Error('Not enough or too many segments');
  }

  // All segment should be base64
  var payloadSeg = segments[1];

  var payload = JSON.parse(base64urlDecode(payloadSeg));

  return payload;
}


function credsViaJWT(): Creds {
    const auth: string = urlSearchParams.get("auth") as string;
    console.assert(typeof auth === 'string');
    var payload = jwt_decode(auth);
    return payload as Creds;
}

function credsViaGet(): Creds {
    const target: string = urlSearchParams.get("target") as string;
    console.assert(typeof target === 'string');
    return {
        target,
        username: urlSearchParams.get("username"),
        password: urlSearchParams.get("password")
    }
}

function credsViaPath(): Creds {
    const pathTarget: string = window.location.pathname.split("/")[1];
    return {
        target: pathTarget,
        username: null,
        password: null
    };
}

let target: string, username: string | null, password: string | null;

if (hasAuth) {
    ({ target, username, password } = credsViaJWT());
} else if (hasTarget) {
    ({ target, username, password } = credsViaGet());
} else {
    ({ target, username, password } = credsViaPath());
}

import {Fabric} from "./fabric";

const fabric = new Fabric('#fabric', target, username, password);
console.log(fabric);
export {}
