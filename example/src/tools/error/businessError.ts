export class BusinessError {
    private code: string;
    private message: string;
    private innerExceptions: BusinessError[];
    constructor(code: string)
    constructor(innerExceptions: BusinessError[])
    constructor(code: string, message: string)
    constructor(code: string, innerExceptions: BusinessError[])
    constructor(param1: any, param2?: any) {
        var code: string,
            innerExceptions: BusinessError[], 
            message: string;

        if (param1 instanceof Array) {
            innerExceptions = param1;
        } else {
            code = param1;
        }

        if (param2 instanceof Array) {
            innerExceptions = param2;
        } else {
            message = param2;
        }
        
        this.code = code;
        this.message = message || `error ${code}`;
        this.innerExceptions = innerExceptions;
    }

    toString() {
        return this.message;
    }

    getCode() {
        return this.code;
    }

    forEach(callback: (error: BusinessError) => boolean) {
        if(!callback(this)) {
            this.innerExceptions && this.innerExceptions.forEach(exc => {
                exc && exc.forEach(callback);
            });
        }
    }
}