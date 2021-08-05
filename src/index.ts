import {Fabric} from "./fabric";

const urlSearchParams = new URLSearchParams(window.location.search);

const target: string | null = urlSearchParams.get('target');
const username: string | null = urlSearchParams.get('username');
const password: string | null = urlSearchParams.get('password');
if (target != null) {
    console.log('[MAIN] configuration option passed by url', {
        target,
        username,
        password
    });
    const fabric = new Fabric('#fabric', target, username, password);
}

export {}
