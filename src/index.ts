import RFB from '@novnc/novnc/core/rfb';

interface ConfigResponseJSON {
    url: string;
    username: string;
    password: string;
}

function configResponseGuard(json: any): ConfigResponseJSON | null {
    if (typeof json !== 'object') {
        return null;
    }

    const res: Record<string, unknown> = {};
    const entries: [string, unknown][] = Object.entries(json)
        .filter(([key, val]: [string, unknown]) => {
            return ['url', 'username', 'password'].includes(key) &&
                typeof val === 'string';
        });
    if (entries.length < 3) {
        return null;
    }
    for (const [key, val] of entries) {
        res[key] = val;
    }
    return res as unknown as ConfigResponseJSON;
}

export class Fabric {
    private rfb: RFB | null = null;

    constructor(
        private selector: string,
        private configRemoteURL: string
    ) {
        (async () => this.init())();
    }

    async init() {
        const promise: Promise<Response> = fetch(this.configRemoteURL);
        const response: Response = await promise;
        if (!response.ok || response.headers.get('content-type') !== 'application/json') {
            return;
        }
        const config: ConfigResponseJSON | null = configResponseGuard(await response.json());
        if (!config) {
            return;
        }
        console.log(config);
        const el: Node | null = document.querySelector(this.selector);
        if (!el) {
            return;
        }
        this.rfb = new RFB(el, config.url, {
            credentials: {
                username: config.username,
                password: config.password,
            }
        });
    }
}
