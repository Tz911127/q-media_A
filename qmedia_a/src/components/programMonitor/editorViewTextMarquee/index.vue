<template>
  <div
    class="editor-page-view-text-marquee"
    ref="textMarquee"
    :style="{'animation':data.isScroll?outerAnimationStyle:''}"
    style="overflow: visible"
  >
    <!-- <div class="version"
    >-->
    <div
      class="table-cell"
      :style="{'text-align':'left','vertical-align':data.verticalAlign,'font-size':data.size*fontUnit+'px'}"
    >
      <span
        ref="tSpan"
        :style="{
                      'color':'rgb('+data.color.r+','+data.color.g+','+data.color.b+')',
                      'animation':data.isScroll?innerAnimationStyle:''
                  }"
        style="display: inline-block;white-space: pre;"
      >{{data.value}}</span>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
const {
  getOuterAnimation,
  getInnerAnimation
} = require("../../../libs/marqueeAnimations");
// import "../../../editorFive/assets/marquee-animations.css";
import "../../../style/marquee-animations.css"
export default {
  data() {
    return {
      fontUnit: null,
      innerAnimationStyle: null,
      outerAnimationStyle: null,
      outerWidth: null,
      innerWidth: null,
      maxPixel: null
    };
  },
  props: {
    pixelHorizontal: {
      type: Number,
      default: () => {}
    },
    pixelVertical: {
      type: Number,
      default: () => {}
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.maxPixel =
      this.pixelHorizontal > this.pixelVertical
        ? this.pixelHorizontal
        : this.pixelVertical;
    this.fontUnit = this.maxPixel / 1000;
    this.$nextTick(() => {
      setTimeout(() => {
        let pNode = this.$refs.textMarquee;
        let tSpan = this.$refs.tSpan;
        this.outerWidth = pNode.clientWidth;
        this.innerWidth = tSpan.clientWidth;
        this.resetStyle(this.data.speed);
      });
    });
  },
  methods: {
    resetStyle(speed) {
      var outerAnimName = getOuterAnimation(true);
      var innerAnimName = getInnerAnimation(true);
      var seconds =
        ((this.outerWidth + this.innerWidth) * 400) / speed / this.maxPixel;
      this.outerAnimationStyle =
        outerAnimName + " " + seconds + "s linear infinite";
      this.innerAnimationStyle =
        innerAnimName + " " + seconds + "s linear infinite";
    }
  },
  watch: {
        // data:{
        //   handler(newValue,oldValue){
        //     var speed = this.data.speed
        //         var outerAnimName = getOuterAnimation(true);
        //         var innerAnimName = getInnerAnimation(true);
        //         console.log(outerAnimName)
        //         //marqueeDOM.clientWidth
        //         window.setTimeout(()=> {
        //                 var seconds = (this.outerWidth + this.innerWidth) * 400 / speed / this.maxPixel;
        //                 this.outerAnimationStyle = outerAnimName + ' ' + seconds + 's linear infinite';
        //                 this.innerAnimationStyle = innerAnimName + ' ' + seconds + 's linear infinite';
        //             // });
        //         }, 0);
        //   },deep:true
            
        // },
    "data.speed"(newValue, oldValue) {
      if (newValue) {
        this.resetStyle(newValue);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.editor-page-view-text-marquee {
  width: 100%;
  height: 100%;
  display: table;
  table-layout: fixed;
  overflow: visible;
  // > .version {
  //     display: table;
  //     table-layout: fixed;
  //     width: 100%;
  //     height: 100%;
  //     overflow: visible;

  > .table-cell {
    display: table-cell;
    width: 100%;
    height: 100%;
    white-space: nowrap;
    line-height: 1.2;
  }
  // }
}
</style>