import {Observable} from "rxjs/Observable";
import {AjaxResponse} from "rxjs/observable/dom/AjaxObservable";

class ReadableAjaxUtils {
    private static readonly BaseApiUrl = "http://localhost:3001";
    private static readonly MinimumRequestHeaders = {
        Authorization: "ThisIsSomeAuthHeader"
    };

    private static getFullApiUrl(path: string) {
        let slash = `/`;

        if (path.startsWith(slash)) {
            slash = ``;
        }

        return `${this.BaseApiUrl}${slash}${path}`;
    }

    private static addMinimumRequestHeaders(headers: Object) {
        Object.assign(headers, this.MinimumRequestHeaders);
    }

    static get<TResponse>(path: string, headers: Object = {}): Observable<TResponse> {
        this.addMinimumRequestHeaders(headers);

        const fullApiUrl = this.getFullApiUrl(path);

        return Observable.ajax.getJSON<TResponse>(fullApiUrl, headers);
    }

    static post(path: string, body?: any, headers: Object = {}): Observable<AjaxResponse> {
        this.addMinimumRequestHeaders(headers);

        const fullApiUrl = this.getFullApiUrl(path);

        return Observable.ajax.post(fullApiUrl, body, headers);
    }
}

export default ReadableAjaxUtils;