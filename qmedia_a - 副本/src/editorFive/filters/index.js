
var find = require('../../libs/array').find;
const editorProgramThumb = function(programSize, page){
    var programWidth, programHeight;
    if (page.pixelHorizontal === page.pixelVertical) {
      //方屏
      programWidth = programSize;
      programHeight = programSize;
    } else if (page.pixelHorizontal > page.pixelVertical) {
      //横屏
      programWidth = programSize;
      programHeight =
        (programSize * page.pixelVertical) / page.pixelHorizontal;
    } else {
      //竖屏
      programWidth =
        (programSize * page.pixelHorizontal) / page.pixelVertical;
      programHeight = programSize;
    }

    return {
      width: programWidth + "px",
      height: programHeight + "px"
    };
}

const editorOSSImageUrlResizeFilter = function(imgUrl, size) {
    if (imgUrl) {
      var joinChar = imgUrl.indexOf("?") >= 0 ? "&" : "?";
      return (
        imgUrl +
        joinChar +
        "x-oss-process=image/resize,m_lfit,h_" +
        size +
        ",w_" +
        size
      );
    } else {
      return "";
    }
  }

const editorPageThumbBackgroundStyle = function(backGround){
    if (backGround) {
        var style = {
          opacity: backGround.opacity / 100
        };
        if (backGround.type === 1) {
          var color = backGround.color;
          style["background"] =
            "rgb(" + color.r + "," + color.g + "," + color.b + ")";
        } else if (backGround.type === 2) {
          if (backGround.image) {
            let src= JSON.parse(localStorage.getItem('userInfo'))
            // let imgUrl = editorOSSImageUrlResizeFilter(
            //   backGround.image.url,
            //   200
            // );
            // let imgUrl = "https://cdn-img.q-media.red/"+backGround.image.path
            style["background"] =
              "url("+src.cdnImgUrl+backGround.image.path +") no-repeat scroll center center / 100% 100% border-box border-box";
          }
        }

        return style;
      }
}

const editorElementLayoutStyle = function(layout,ele,pixelVertical){
    if (layout) {
        var rotate_val = "rotate(" + layout.rotate + "deg)";
        return {
          'left': layout.left + "%",
          'top': layout.top + "%",
          'width': layout.width + "%",
          'height': layout.height + "%",
          "z-index": layout.zIndex,
          "-webkit-transform": rotate_val,
          "-moz-transform": rotate_val,
          "-o-transform": rotate_val,
          'transform': rotate_val
        };
      // }else if(layout&&ele.type==150){
      //   var rotate_val = "rotate(" + layout.rotate + "deg)";
      //   let src = ele.data.value.replace(/\n/g,"*");
      //   let enterNum = (src.split('*')).length-1;
      //   return {
      //     'left': layout.left + "%",
      //     'top': layout.top + "%",
      //     // 'width': layout.width + "%",
      //     // 'height': layout.height + "%",
      //     'width':layout.width + "%",
      //     // 'min-height':layout.height*layout.lineHeight*(enterNum+1)+'%',
      //     "height":layout.eleHeight+'%',
      //     "z-index": layout.zIndex,
      //     "-webkit-transform": rotate_val,
      //     "-moz-transform": rotate_val,
      //     "-o-transform": rotate_val,
      //     'transform': rotate_val
      //   };
      }
}

const editorElementViewLayoutStyle = function(layout,ele){
  if (layout) {
      var rotate_val = "rotate(" + layout.rotate + "deg)";
      return {
        'left': layout.left + "%",
        'top': layout.top + "%",
        'width': layout.width + "%",
        'height': layout.height + "%",
        "z-index": layout.zIndex,
        "-webkit-transform": rotate_val,
        "-moz-transform": rotate_val,
        "-o-transform": rotate_val,
        'transform': rotate_val
      };
    // }else if(layout&&ele.type==150){
    //   var rotate_val = "rotate(" + layout.rotate + "deg)";
    //   let src = ele.data.value.replace(/\n/g,"*");
    //   let enterNum = (src.split('*')).length-1;
    //   return {
    //     'left': layout.left + "%",
    //     'top': layout.top + "%",
    //     // 'width': layout.width + "%",
    //     // 'height': layout.height + "%",
    //     'width':layout.width + "%",
    //     // 'min-height':layout.height*2+'%',(1111)
    //     // 'min-height':layout.height*layout.lineHeight*(enterNum+1)+'%',
    //     'height':layout.eleHeight+'%',
    //     "z-index": layout.zIndex,
    //     "-webkit-transform": rotate_val,
    //     "-moz-transform": rotate_val,
    //     "-o-transform": rotate_val,
    //     'transform': rotate_val
    //   };
    }
}


const editorElementThumbLayoutStyle = function(layout,ele){
  if (layout) {
      var rotate_val = "rotate(" + layout.rotate + "deg)";
      return {
        'left': layout.left + "%",
        'top': layout.top + "%",
        'width': layout.width + "%",
        'height': layout.height + "%",
        "z-index": layout.zIndex,
        "-webkit-transform": rotate_val,
        "-moz-transform": rotate_val,
        "-o-transform": rotate_val,
        'transform': rotate_val
      };
    }
    // else if(layout&&ele.type==170){
    //   var rotate_val = "rotate(" + layout.rotate + "deg)";
    //   let src = ele.data.value.replace(/\n/g,"*");
    //   let enterNum = (src.split('*')).length-1;
    //   return {
    //     'left': layout.left + "%",
    //     'top': layout.top + "%",
    //     // 'width': layout.width + "%",
    //     // 'height': layout.height + "%",
    //     'width':layout.width + "%",
    //     'height':layout.height*(enterNum+1)+'%',
    //     // 'height':layout.eleHeight+'%',
    //     "z-index": layout.zIndex,
    //     "-webkit-transform": rotate_val,
    //     "-moz-transform": rotate_val,
    //     "-o-transform": rotate_val,
    //     'transform': rotate_val
    //   };
    // }
}

const editorElementBackgroundStyle = function(background,border,pixelHorizontal,pixelVertical){
    var referencePixel =
    pixelHorizontal > pixelVertical ? pixelHorizontal : pixelVertical;

  var borderWidthUnit = referencePixel / 1000;

  var style = {
    "border-radius": border.radius * borderWidthUnit + "px",
    opacity: background.opacity / 100
  };

  if (background.type === 1) {
    var color = background.color;
    style["background"] =
      "rgb(" + color.r + "," + color.g + "," + color.b + ")";
  } else if (background.type === 2) {
    if (background.image) {
      let src= JSON.parse(localStorage.getItem('userInfo'))
      style["background"] =
        "url("+src.cdnImgUrl +
        background.image.url +
        "') no-repeat scroll center center / 100% 100% border-box border-box";
    }
  }

  return style;
}

const editorElementBorderStyle = function(border, pixelHorizontal, pixelVertical,ele){
    var referencePixel =
    pixelHorizontal > pixelVertical ? pixelHorizontal : pixelVertical;

  var borderWidthUnit = referencePixel / 1000;

  var color = border.color;
// if(ele.type!=150){
  return {
    padding: border.padding * borderWidthUnit + "px",
    border:
      border.style +
      " " +
      border.width * borderWidthUnit +
      "px rgba(" +
      color.r +
      "," +
      color.g +
      "," +
      color.b +
      "," +
      border.opacity / 100 +
      ")",
    "border-radius": border.radius * borderWidthUnit + "px"
  }
// }
// else if(ele.type==150){
//   return {
//     padding: border.padding * borderWidthUnit + "px",
//     border:
//       border.style +
//       " " +
//       border.width * borderWidthUnit +
//       "px rgba(" +
//       color.r +
//       "," +
//       color.g +
//       "," +
//       color.b +
//       "," +
//       border.opacity / 100 +
//       ")",
//     "border-radius": border.radius * borderWidthUnit + "px",
//     'wdith':'100%',
//     // 'min-height':ele.layout.height+'%',
//     'min-height':ele.layout.eleHeight+'%'
// }
// }
}

const editorTypeDescribe = function(type){
    switch (type) {
        case 100:
          return "文字";
        case 170:
          return "文本";
        case 160:
          return "走马灯";
        case 200:
          return "单图";
        case 250:
          return "图片";
        case 300:
          return "单视频";
        case 350:
          return "视频";
        case 500:
          return "时间";
        case 900:
          return "网页";
        case 950:
          return "网页";
        case 1000:
          return "流媒体";
        case 1100:
          return "摄像头";
        case 1200:
          return "天气";
        case 1300:
          return "文档";
        case 1400:
          return "混播";
        case 1500:
          return "特效";
        case 1600:
          return "倒计时";
        case 1700:
          return "二维码";
        // case 1800:
        //     return '折线图';
        default:
          return "未知";
      }
}

// const editorFontFamilyFilter = function(fonts){
//     return function (fontID) {
//       var font = find(fonts, function (font) {
//           return font.id === fontID;
//       });
//       return font ? font.value : fonts[0].value;
//   };
// }
const editorDateTimeFormatterFilter = function(time,formatter){
      var padDate=function(va){
        va=va<10?'0'+va:va;
        return va
    }
        var value=new Date(time);
        var year=value.getFullYear();
        var month=padDate(value.getMonth()+1);
        var day=padDate(value.getDate());
        let hh =padDate(value.getHours())
        let mm =padDate(value.getMinutes())
        let ss =padDate(value.getSeconds())
        

  switch (formatter){
    case 1: 
      return year+'年'+month+'月'+day+'日'+' '+hh+':'+mm+':'+ss;
    case 2:
      return year+'年'+month+'月'+day+'日'
    case 3:
      return hh+':'+mm+':'+ss
    case 4:
      return year+'年'+month+'月'+day+'日'+" 星期" + "日一二三四五六".substr(time.getDay() % 7, 1);
    case 5:
      return year + '-' + month + '-' + day +' ' + hh + ':' + mm + ':' + ss;
    default:
      return year+'年'+month+'月'+day+'日' +hh+':'+mm+':'+ss;
        
  }

}

const editorContainBackgroundFilter = function(imgUrl){
    if (imgUrl) {
        return "url('" + imgUrl + "') no-repeat scroll center center / contain border-box border-box";
    } else {
        return '';
    }
}

const editorImageUrlFilter = function(path,type) {
  let src= JSON.parse(localStorage.getItem('userInfo'))
  if (path&&type==0) {
    return src.cdnImgUrl+path
  }else{
    return src.cdnVideoUrl+path+".jpg"
  }
}

const editorVideoFilter = function(path){
  let src = JSON.parse(localStorage.getItem('userInfo'))
  if(path){
    return src.cdnVideoUrl+path
  }
}

//字节转MB
const programMb = function(num){
  if(num!=0){
    if((num/1024/1024).toFixed(2)<0.10){
      return Math.round(num/1024)+'KB'
    }else{
      return (num/1024/1024).toFixed(2)+'MB'
    }
  }else{
    return 0+'B'
  }
}

//时分秒转换
const formatSeconds = function(value) {
      var theTime = parseInt(value);// 秒
      var middle= 0;// 分
      var hour= 0;// 小时
  
      if(theTime > 60) {
          middle= parseInt(theTime/60);
          theTime = parseInt(theTime%60);
          if(middle> 60) {
              hour= parseInt(middle/60);
              middle= parseInt(middle%60);
          }
      }
      var result = ""+parseInt(theTime)+"秒";
      if(middle > 0) {
          result = ""+parseInt(middle)+"分"+result;
      }
      if(hour> 0) {
          result = ""+parseInt(hour)+"小时"+result;
      }
      return result;
  }

  const editorProgramViewStyle = function(scale, pixelHorizontal, pixelVertical){
   
        var style = {
          'width': pixelHorizontal + 'px',
          'height': pixelVertical + 'px'
      };
        style['-webkit-transform']
          = style['-moz-transform']
          = style['-o-transform']
          = style['transform']
          = 'translate(-50%,-50%) scale(' + (scale) + ')';
      return style;
  }

  const editorPageViewBackgroundStyle = function(backGround){
      var style = {
        'opacity': backGround.opacity / 100
    };

    if (backGround.type === 1) {
        var color = backGround.color;
        style['background'] = 'rgb(' + color.r + ',' + color.g + ',' + color.b + ')';
    } else if (backGround.type === 2) {
        let src = JSON.parse(localStorage.getItem('userInfo'))
        if (backGround.image) {
           style['background'] = "url("+src.cdnImgUrl+ backGround.image.path + ") no-repeat scroll center center / 100% 100% border-box border-box";
        }
    }
    return style;
  }

  const filterTerName= function(name,type){
    if(type == 0) {
      return name
    }else {
      if(name) {
      let len = name.lastIndexOf('_')
      let newName = name.substring(len + 1)
      newName = editorDateTimeFormatterFilter(Number(newName), 5)
      // + '(' + '已删' + ')'
      return name.substring(0, len) 
    }
  }

  }

  //尺寸过滤器(文件体积，显示GB、MB、KB等)
  const resourceSizeFilter = (size) => {
  if (size) {
      if (size < 1024) {
          return size + ' B';
      } else if (size < 1024 * 1024) {
          return (size / 1024).toFixed(2) + ' KB';
      } else if (size < 1024 * 1024 * 1024) {
          return (size / 1024 / 1024).toFixed(2) + ' MB';
      } else if (size < 1024 * 1024 * 1024 * 1024) {
          return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB';
      } else {
          return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB';
      }
  } else {
      return '未知';
  }

}

const numFilter = (value) => {
  let realVal = ''
  value = value/100
  if (value) {
    // 截取当前数据到小数点后两位
    realVal = parseFloat(value).toFixed(2)
  } else {
    realVal = '0.00'
  }
  return realVal
}

//时间格式化
const filterData = function (date) {
  if (date) {
    date = JSON.stringify(date);
    return (
      date.substring(0, 4) +
      "-" +
      date.substring(4, 6) +
      "-" +
      date.substring(6, 8)
    );
  }
}

export {
  editorProgramThumb,
  editorPageThumbBackgroundStyle,
  editorElementLayoutStyle,
  editorOSSImageUrlResizeFilter,
  editorElementBackgroundStyle,
  editorElementBorderStyle,
  editorTypeDescribe,
  editorDateTimeFormatterFilter,
  editorContainBackgroundFilter,
  editorElementThumbLayoutStyle,
  editorImageUrlFilter,
  editorVideoFilter,
  programMb,
  formatSeconds,
  editorProgramViewStyle,
  editorPageViewBackgroundStyle,
  editorElementViewLayoutStyle,
  filterTerName,
  resourceSizeFilter,
  numFilter,
  filterData
}