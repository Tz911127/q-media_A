export function formateDate(d) {
    let date = String(d)
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

//素材状态
export function filterStatus(num) {
    if (num == 0) {
        return "待提交审核";
    } else if (num == 1) {
        return "审核成功";
    } else if (num == 2) {
        return "内部审核中";
    } else if (num == 3) {
        return "平台审核中";
    } else if (num == 4) {
        return "内部审核失败";
    } else if (num == 5) {
        return "平台审核失败";
    } else if (num == 6) {
        return "转码中";
    } else if (num == 7) {
        return "转码失败";
    }
}
// const numFilter = (value) => {
//     let realVal = ''
//     value = value / 100
//     if (value) {
//         // 截取当前数据到小数点后两位
//         realVal = parseFloat(value).toFixed(2)
//     } else {
//         realVal = '0.00'
//     }
//     return realVal
// }

export function filtersDate(num) {
    if (num != "") {
        num = formateDate(num[0].dateStart) + "至" + formateDate(num[0].dateEnd);
        return num;
    }
}

export function filterWeek(num, type) {
    if (type == 0) {
        let weeksArr = num.split(",");
        if (weeksArr.length == 7) {
            weeksArr = "每天";
        } else {
            weeksArr = String(weeksArr);
            weeksArr = weeksArr.replace("1", "周一");
            weeksArr = weeksArr.replace("2", "周二");
            weeksArr = weeksArr.replace("3", "周三");
            weeksArr = weeksArr.replace("4", "周四");
            weeksArr = weeksArr.replace("5", "周五");
            weeksArr = weeksArr.replace("6", "周六");
            weeksArr = weeksArr.replace("7", "周日");
        }
        return weeksArr;
    } else {
        return num;
    }
}
export function filtersType(num) {
    if (num === 0) {
        return "轮播";
    } else if (num === 1) {
        return "插播";
    }
}

export function filterCheck(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == "一级审核") {
            arr[i] = 1;
        }
        if (arr[i] == "二级审核") {
            arr[i] = 2;
        }
        if (arr[i] == "三级审核") {
            arr[i] = 3;
        }
        if (arr[i] == "四级审核") {
            arr[i] = 4;
        }
    }
    arr = this.sort(arr);
    return arr;
}
export function sort(arr) {
    for (var j = 0; j < arr.length - 1; j++) {
        //两两比较，如果前一个比后一个大，则交换位置。
        for (var i = 0; i < arr.length - 1 - j; i++) {
            if (arr[i] > arr[i + 1]) {
                var temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
        }
    }
    return arr;
}

export function filterReCheck(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == 1) {
            arr[i] = '一级审核';
        }
        if (arr[i] == 2) {
            arr[i] = '二级审核';
        }
        if (arr[i] == 3) {
            arr[i] = '三级审核';
        }
        if (arr[i] == 4) {
            arr[i] = '四级审核';
        }
    }
    return arr
}