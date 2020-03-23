//引入自定义轮播控件动画库
let anims = require('../style/images-animation.css');

const {find} = require('../libs/array');

let entryAnims = [
    {id: 1, name: "右入", value: "right-slide-in"},
    {id: 2, name: "左入", value: "left-slide-in"},
    {id: 3, name: "上入", value: "top-slide-in"},
    {id: 4, name: "下入", value: "bottom-slide-in"},
    {id: 5, name: "淡入", value: "fade-in"},
    {id: 6, name: "左旋入", value: "left-rotateY-in"},
    {id: 7, name: "右旋入", value: "right-rotateY-in"}
];

let leaveAnims = [
    {id: 1, name: "左出", value: "left-slide-out"},
    {id: 2, name: "右出", value: "right-slide-out"},
    {id: 3, name: "下出", value: "bottom-slide-out"},
    {id: 4, name: "上出", value: "top-slide-out"},
    {id: 5, name: "淡出", value: "fade-out"},
    {id: 6, name: "左旋出", value: "left-rotateY-out"},
    {id: 7, name: "右旋出", value: "right-rotateY-out"}
];

exports.getEntryAnimation = function (id) {
    let anim = find(entryAnims, function (item) {
        return item.id === id;
    });
    return anim ? anim : entryAnims[0];
};

exports.getLeaveAnimation = function (id) {
    let anim = find(leaveAnims, function (item) {
        return item.id === id;
    });
    return anim ? anim : leaveAnims[0];
};
