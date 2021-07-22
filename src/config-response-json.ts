import {ConnectionConfig} from "./connection-config";

export class ConfigResponseJSON {
    [config: string]: ConnectionConfig;

    static guard(json: ConfigResponseJSON): ConfigResponseJSON | null {
        if (typeof json !== 'object') {
            return null;
        }

        const res: ConfigResponseJSON = new ConfigResponseJSON();
        for (const [key, val] of Object.entries(json)) {
            const config: Record<string, unknown> = {};

            const entries: [string, unknown][] = Object.entries(val)
                .filter(([k, v]: [string, unknown]) => {
                    return ['target', 'username', 'password'].includes(k) &&
                        typeof v === 'string';
                });
            if (entries.length < 3) {
                return null;
            }
            for (const [k, v] of entries) {
                config[k] = v;
            }
            res[key] = Object.assign(new ConnectionConfig(), config);
        }
        return res;
    }
}
