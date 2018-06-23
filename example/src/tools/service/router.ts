import { Injectable } from '@angular/core';

@Injectable()
export class Router {
    private _callbacks: ((href: string, pathname: string, hash: string) => void)[] = [];
	private _last: string;
    constructor() {
        window.onpopstate = (state) => this.change(location.href);
		window.onhashchange = (state) => this.change(location.href); 
    }

    public on(callback: (href: string, pathname: string, hash: string) => void) {
        var parsed = this.parse(location.href);
        callback(parsed.href, parsed.pathname, parsed.hash);
        this._callbacks.push(callback);
    }

    public trigger(href: string);
    public trigger(href: string, replace: boolean);
    public trigger(href: string, replace?: boolean) {
        if (!replace) { 
            history.pushState({}, '', href); 
        } else {
            history.replaceState({}, '', href);
        }
        this.change(href);
    }

    private change(str: string) {
		if (this._last !== str) {
			this._last = str;
			var parsed = this.parse(str);
			this._callbacks.forEach(callback => callback(parsed.href, parsed.pathname, parsed.hash));
		}
    }

    private parse(href: string) {
        var a = document.createElement('a');
        a.href = href;
        return a;
    }
}