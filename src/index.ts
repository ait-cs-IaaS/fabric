import RFB from '@novnc/novnc/core/rfb';
interface ConfigResponseJSON {}

export class Fabric {
    private rfb: RFB;

    constructor(private configRemoteURL: string) {
        this.rfb = new RFB();
        (async () => this.init())();
    }

    async init() {
        const promise: Promise<ConfigResponseJSON> = fetch(this.configRemoteURL);
        const response: ConfigResponseJSON = await promise;
        console.log(response);
    }
}
