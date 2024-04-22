import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CommonUtils {

    constructor() {
    }

    /**
     * Method to check if the object is generic javascript error (please also see https://stackoverflow.com/questions/30469261/checking-for-typeof-error-in-js)
     *
     * @param {Object} object An object to check if this is a generic javascript error
     * @return {boolean} Returns true if this is a generic javascript error, otherwise false
     */
    public isJSError(object: any): boolean {
        // if (object) {
        //     return object instanceof Error || (object.stack && object.message && typeof object.stack === 'string' && typeof object.message === 'string');
        // }
        if (object) {
            return object instanceof Error;
        }
        return false;
    }

    /**
     * Method to stringify object containing circular references
     * Another implementation - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
     *
     * @param {Object} object An object to check if this is a generic javascript error
     * @return {boolean} Returns true if this is a generic javascript error, otherwise false
     */
    public safeStringify(obj: any, indent = 2): string {
        if (this.isJSError(obj) === true) {
            // NOTE: JS Error object has no enumerable props so when stringified it returns empty object
            // see https://stackoverflow.com/questions/18391212/is-it-not-possible-to-stringify-an-error-using-json-stringify
            const plainObject = {};
            Object.getOwnPropertyNames(obj).forEach((key) => {
                //@ts-ignore
                plainObject[key] = obj[key];
            });
            obj = plainObject;
        }
        //@ts-ignore
        let cache = [];
        const retVal = JSON.stringify(
            obj,
            (key, value) =>
                typeof value === 'object' && value !== null
                    //@ts-ignore
                    ? cache.includes(value)
                        ? undefined // Duplicate reference found, discard key
                        : cache.push(value) && value // Store value in our collection
                    : value,
            indent
        );
        //@ts-ignore
        cache = null;
        return retVal;
    }

}

