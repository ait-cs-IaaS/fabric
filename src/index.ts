import {Fabric} from "./fabric";

const urlSearchParams = new URLSearchParams(window.location.search);
const urlPathTarget   = window.location.pathname.split('/')[1];

let target: string | null = urlSearchParams.get('target');
const username: string | null = urlSearchParams.get('username');
const password: string | null = urlSearchParams.get('password');
if (target == null) {
    target = urlPathTarget;
}
if (target != null) {
    console.log('[MAIN] configuration option passed by url', {
        target,
        username,
        password
    });
    const fabric = new Fabric('#fabric', target, username, password);
}

export {}
