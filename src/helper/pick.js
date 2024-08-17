const pick = (object, keys) => {
    // console.log(keys);
    // console.log(object);
    return keys.reduce((obj,k)=>{
        if(object && object.hasOwnProperty(k)){
            obj[k]=object[k]
        }

        return obj
    },{})

}

module.exports = pick