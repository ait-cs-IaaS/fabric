import * as jwt from 'jsonwebtoken';

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
    return jwt.decode(auth) as Creds;
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

class Fabric {
    constructor(
        public target: string,
        public username: string | null,
        public password: string | null
    ) {}
}

const fabric = new Fabric(target, username, password);
console.log(fabric);
