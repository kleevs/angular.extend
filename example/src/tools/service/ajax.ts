import { Injectable } from '@angular/core';

@Injectable()
export class Ajax {
    constructor() {
    }

    public do<T>(fn: ()=>T): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            setTimeout(() => {
                try {
                    resolve(fn());
                } catch(e) {
                    reject(e);
                }
            });
        });
    }
}