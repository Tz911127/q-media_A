export function formateDate(date) {
    if (date) {
        if (date.length == 6) {
            return (
                date.substring(0, 4) +
                "-" +
                date.substring(4, 6)
            );
        } else {
            return (
                date.substring(0, 4) +
                "-" +
                date.substring(4, 6) + "-" +
                date.substring(6, 8)
            );
        }
    }
}

//毫秒转时分秒
export function formatDuring(mss) {
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + 24 * (days)
    return hours
}

export function filterMonth(date) {
    date = Number(date)
    if (date) {
        date = JSON.stringify(date);
        return (
            date.substring(4, 6) +
            "-" +
            date.substring(6, 8)
        );
    }
}
//格式化money
export function filterMoney(money) {
    return '￥' + (money / 100).toFixed(2)
}
//秒转换成时分秒
export function align(n) {
    return (n < 10 ? "0" : "") + n;
}
export function formatSeconds(s) {
    var hour = Math.floor((s) / 3600);
    var minute = Math.floor((s - hour * 3600) / 60);
    var second = s - hour * 3600 - minute * 60;
    return align(hour) + "时" + align(minute) + "分" + align(second) + "秒";
}


//KB转MB
export function programMb(num) {
    if (num != 0) {
        if ((num / 1024 / 1024).toFixed(2) < 0.10) {
            return Math.round(num / 1024) + 'KB'
        } else {
            return (num / 1024 / 1024).toFixed(2) + 'MB'
        }
    } else {
        return 0 + 'B'
    }
}
//时间戳转换
export function filterTime(time) {
    var padDate = function (va) {
        va = va < 10 ? '0' + va : va;
        return va
    }
    var value = new Date(time);
    var year = value.getFullYear();
    var month = padDate(value.getMonth() + 1);
    var day = padDate(value.getDate());
    let hh = padDate(value.getHours())
    let mm = padDate(value.getMinutes())
    let ss = padDate(value.getSeconds())

    return year + '-' + month + '-' + day + ' ' + hh + ':' + mm + ':' + ss;
}

//已删除的广告名称转换
export function filterPrograms(name, type) {
    if (type == 0) {
        return name
    } else {
        let len = name.lastIndexOf('_')
        return name.substring(0, len) + '(已删)'
    }

}
//已删除的终端名称转换
export function filterTerminal(name, type) {
    if (type == 0) {
        return name
    } else {
        let len = name.lastIndexOf('_')
        let newName = name.substring(len + 1)
        return name.substring(0, len) + '(' + filterTime(Number(newName)) + ')'
    }

}