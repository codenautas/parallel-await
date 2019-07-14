"use strict";

function isPlainObject(x:any):boolean{
    return typeof x==="object" && x && x.constructor === Object;
}

export type Resolved<T> = T extends Promise<infer U> ? U : T;

export async function parallel<T>(objectWithUnresolvedPromises:T):Promise<{ [P in keyof T]: Resolved<T[P]> } > {
    var resolved:{[P in keyof T]: Resolved<T[P]>};
    // @ts-ignore
    resolved = {};
    for(var attr in objectWithUnresolvedPromises){
        // @ts-ignore
        resolved[attr] = await objectWithUnresolvedPromises[attr];
    }
    return resolved;
}