function find(that, match) {
    for (let i = 0, l = that.length; i < l; i++) {
        if (match(that[i])) {
            return that[i];
        }
    }
    return null;
}

function remove(that, item) {
    for (let i = that.length - 1; i >= 0; i--) {
        if (that[i] === item) {
            that.splice(i, 1);
        }
    }
}

function clear(that) {
    that.splice(0, that.length);
}

function defaultConverter(item) {
    return item;
}

function max(that, converter) {
    let len = that.length;
    if (len === 0) {
        return null;
    }
    converter = converter || defaultConverter;
    let pointer = that[0];
    let max = converter(pointer);
    for (let i = 1; i < len; i++) {
        let thisPointer = that[i];
        let cur = converter(thisPointer);
        if (max < cur) {
            pointer = thisPointer;
            max = cur;
        }
    }
    return pointer;
}

function min(that, converter) {
    let len = that.length;
    if (len === 0) {
        return null;
    }
    converter = converter || defaultConverter;
    let pointer = that[0];
    let min = converter(pointer);
    for (let i = 1; i < len; i++) {
        let thisPointer = that[i];
        let cur = converter(thisPointer);
        if (min > cur) {
            pointer = thisPointer;
            min = cur;
        }
    }
    return pointer;
}

//数组去重复
function unique(that, converter) {
    converter = converter || defaultConverter;
    let arr = [];
    for (let i = 0, len = that.length; i < len; i++) {
        let cur = that[i];
        let cur_convert = converter(cur);
        if (arr.every(function (item) {
                return converter(item) !== cur_convert;
            })) {
            arr.push(cur);
        }
    }
    return arr;
}

module.exports = {
    find: find,
    remove: remove,
    clear: clear,
    max: max,
    min: min,
    unique: unique
};