export function fetchJSON<T>(url: string): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
        const promise: Promise<Response> = fetch(url);
        const response: Response = await promise;
        console.log(`[fetchJSON] response from remote url ${url}`, response);
        if (!response.ok || response.headers.get('content-type')?.startsWith('application/json') === false) {
            reject({ message: '[fetchJSON] could not retrieve a config file in json format' });
            return;
        }
        const [json, error]: [T, any] = await response
            .json()
            .then(data => [data, null])
            .catch(e => Promise.resolve([null, e])) as [T, any];
        if (error) {
            reject({ message: '[fetchJSON] unexpected exception occured', error });
            return;
        }
        console.log('[fetchJSON] parsed response', json);
        resolve(json);
    })
}
