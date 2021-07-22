import {Fabric} from "./fabric";

const urlSearchParams = new URLSearchParams(window.location.search);

const user: string | null = urlSearchParams.get('user');
if (user != null) {
    console.log('[MAIN] configuration option passed by url', user);
    const fabric = new Fabric('#fabric', 'config.json', user);
}

export {}
