"use strict";

function isPlainObject(x:any):boolean{
    return typeof x==="object" && x && x.constructor === Object;
}

export type Resolved<T> = T extends Promise<infer U> ? U : T;

export async function parallel<T>(objectWithUnresolvedPromises:T):Promise<{ [P in keyof T]: Resolved<T[P]> } > {
    return new Promise(function(resolve, reject){
        var resolved:{[P in keyof T]: Resolved<T[P]>};
        // @ts-ignore
        resolved = {};
        var countPending = 0;
        var allLauncheds = false;
        for(var attr in objectWithUnresolvedPromises){
            (function(attr:keyof T){
                countPending++;            
                Promise.resolve(objectWithUnresolvedPromises[attr]).then(function(result){
                    countPending--;
                    // @ts-ignore
                    resolved[attr]=result;
                    if(allLauncheds && !countPending){
                        resolve(resolved)
                    }
                },reject);
            })(attr);
        }
        allLauncheds=true;
        if(!countPending){
            resolve(resolved)
        }
    });
}

export async function parallelNotAsSoonAsPosible<T>(objectWithUnresolvedPromises:T):Promise<{ [P in keyof T]: Resolved<T[P]> } > {
    var resolved:{[P in keyof T]: Resolved<T[P]>};
    // @ts-ignore
    resolved = {};
    for(var attr in objectWithUnresolvedPromises){
        // @ts-ignore
        resolved[attr] = await objectWithUnresolvedPromises[attr];
    }
    return resolved;
}

parallelNotAsSoonAsPosible.notAsSoonAsPosible=true;

export async function parallelByPromiseAll<T>(objectWithUnresolvedPromises:T):Promise<{ [P in keyof T]: Resolved<T[P]> } > {
    var resolved:{[P in keyof T]: Resolved<T[P]>};
    // @ts-ignore
    resolved = {};
    await Promise.all(Object.keys(objectWithUnresolvedPromises).map(
        // @ts-ignore
        async function(attr:keyof T){
            // @ts-ignore
            resolved[attr] = await objectWithUnresolvedPromises[attr];
        }
    ));
    return resolved;
}