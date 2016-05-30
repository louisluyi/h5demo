/**
 * Created by luyi-netease on 2016/5/30.
 */
'use strict';
let result = {};
module.exports = result;

let key = false;
for(let value of process.argv){
    if(/^-[a-zA-Z]+$/.test(value)){
        if(key){
            result[key] = '';
        }
        key = value.substr(1);
    }
    else if(key){
        result[key] = value;
        key = false;
    }
}