import { Injectable } from '@angular/core';

class TryCatchable<T> {
    public result: any[];
    constructor(fn: ()=> T, private array: any[], private errors: any[]) {
        try {
            var res = fn();
            this.array.push(res);
            this.errors.push(undefined);
        } catch(e) {
            this.array.push(undefined);
            this.errors.push(e);
        }
        this.result = this.array;
    }

    then<T2>(fn: ()=>T2) {
        return new TryCatchable<T2>(
            () => fn(), this.array.map(_ => _), 
            this.errors.map(_ => _)
        );
    }

    catch(callback: (errors: any[])=>void) {
        if (this.errors && this.errors.filter(_ => _).length > 0) {
            callback(this.errors);
        }
    }
}

@Injectable()
export class TryCatch {
    constructor() {
    }

    public try<T>(fn: ()=>T): TryCatchable<T> {
        return new TryCatchable<T>(() => fn(), [], []);
    }
}