//引入自定义跑马灯控件动画库
let anims = require('../style/marquee-animations.css');

exports.getOuterAnimation = function (isLeft) {
    return isLeft ? 'marquee-left-container' : 'marquee-right-container';
};

exports.getInnerAnimation = function (isLeft) {
    return isLeft ? 'marquee-left-text' : 'marquee-right-text';
};
