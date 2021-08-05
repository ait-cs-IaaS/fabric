import RFB from '@novnc/novnc/core/rfb';


export class Fabric {
    private rfb: RFB | null = null;

    constructor(
        private selector: string,
        private target: string,
        private username: string | null,
        private password: string | null
    ) {
        console.log('[FABRIC] initialized');
        const el: Node | null = document.querySelector(this.selector);
        if (!el) {
            return;
        }
        const url: URL = new URL(target, window.location.protocol.replace('http', 'ws') + '//' + window.location.host);
        this.rfb = new RFB(el, url.toString(), {
            credentials: {
                username: username ?? '',
                password: password ?? '',
            }
        });
        // (async () => this.init())();
    }

    // async init(): Promise<void> {
    //     const promise: Promise<Response> = fetch(this.configRemoteURL);
    //     const response: Response = await promise;
    //     console.log(`[FABRIC] response from remote url ${this.configRemoteURL}`, response);
    //     if (!response.ok || response.headers.get('content-type')?.startsWith('application/json') === false) {
    //         console.exception('[FABRIC] could not retrieve a config file in json format');
    //         return;
    //     }
    //     const [json, error]: [ConfigResponseJSON, any] = await response
    //         .json()
    //         .then(data => [data, null])
    //         .catch(e => Promise.resolve([null, e])) as [ConfigResponseJSON, any];
    //     if (error) {
    //         console.exception('[FABRIC] unexpected exception occured', error);
    //     }
    //     console.log('[FABRIC] parsed response', json);
    //     const config: ConfigResponseJSON | null = ConfigResponseJSON.guard(json);
    //     if (!config) {
    //         console.exception('[FABRIC] validation of config failed');
    //         return;
    //     }
    //     if (!(this.user in config)) {
    //         console.exception('[FABRIC] user configuration not in config file', this.user);
    //         return;
    //     }
    //     const el: Node | null = document.querySelector(this.selector);
    //     if (!el) {
    //         return;
    //     }
    //     this.rfb = new RFB(el, config[this.user].target ?? '', {
    //         credentials: {
    //             username: config[this.user].username ?? '',
    //             password: config[this.user].password ?? '',
    //         }
    //     });
    // }
}
