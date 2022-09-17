import {JWT} from "./jwt";

type Creds = {
    target: string,
    username: string | null,
    password: string | null
}

const urlSearchParams = new URLSearchParams(window.location.search);
const hasAuth: boolean = urlSearchParams.has("auth");
const hasTarget: boolean = urlSearchParams.has("target");


function credsViaJWT(): Creds {
    const auth: string = urlSearchParams.get("auth") as string;
    console.assert(typeof auth === 'string');
    var payload = new JWT(auth).payload;
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
        username: urlSearchParams.get("username"),
        password: urlSearchParams.get("password")
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
