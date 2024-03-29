"use strict";

const SPEED = 100;

import {sleep} from 'best-globals';
import {showAndThrow} from 'discrepances';

import * as parallelModule from '../lib/parallel-await';

async function slow<T>(target:string[], message:T, start:number, speed?:number):Promise<{r:T}>{
    await sleep(start);
    var letters = (message+'').split('');
    while(letters.length){
        var letter = letters.shift();
        if(letter == '.'){
            throw Error('good fail');
        }
        target.push(letter);
        await sleep(speed||SPEED);
    }
    return {r:message};
}

['parallel','parallelNotAsSoonAsPosible','parallelByPromiseAll'].forEach(function(funName){
    var parallel = parallelModule[funName];
    if(parallel.notAsSoonAsPosible){
        // return ;
    }
    describe('parallel-await using '+funName, function(){
        it("await all on all promises", async function(){
            var target:string[] = []
            var x = {
                x1: slow(target, true , 10),
                x2: slow(target, 123  , 30),
                x3: slow(target, 'abc', 50),
            }
            var y = await parallel(x);
            showAndThrow(y, {x1:{r:true}, x2:{r:123}, x3:{r:'abc'}});
            showAndThrow(target.join(''), 't1ar2bu3ce');
        })
        it("await all on some promises and some not", async function(){
            var target:string[] = []
            var x = {
                x1: slow(target, true , 10),
                x2: 123,
                x3: slow(target, 'abc', 50),
            }
            var y = await parallel(x);
            showAndThrow(y, {x1:{r:true}, x2:123, x3:{r:'abc'}});
            showAndThrow(target.join(''), 'tarbuce');
        })
        it("await all on not promises", async function(){
            var x = {
                x1: true,
                x2: 123,
                x3: 'abc',
            }
            var y = await parallel(x);
            showAndThrow(y, {x1:true, x2:123, x3:'abc'});
        })
        it("catch await as soon as posible", async function(){
            this.timeout(4000);
            var target:string[] = []
            var x = {
                x1: slow(target, true , 10, 500),
                x2: 123,
                x3: slow(target, 'a.c', 50, 500),
            }
            try{
                var y = await parallel(x);
                throw new Error('must fail waiting');
            }catch(err){
                showAndThrow(err.message, 'good fail')
                showAndThrow(y, undefined);
                if(!parallel.notAsSoonAsPosible){
                    showAndThrow(target.join(''), 'tar');
                }
            }
        })
        it("catch await as soon as posible with two errors", async function(){
            this.timeout(4000);
            var target:string[] = []
            var x = {
                x1: slow(target,'true.',10, 500),
                x2: 123,
                x3: slow(target, 'a.c', 50, 500),
            }
            try{
                var y = await parallel(x);
                throw new Error('must fail waiting');
            }catch(err){
                showAndThrow(err.message, 'good fail')
                showAndThrow(y, undefined);
                if(!parallel.notAsSoonAsPosible){
                    showAndThrow(target.join(''), 'tar');
                }
            }
        })
    });
})
