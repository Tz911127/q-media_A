<template>
  <div
    class="editor-page-view-text-marquee"
    ref="textMarquee"
    style="overflow: visible"
  >
    <!-- <div class="version"
    >-->
    <div
      class="table-cell"
      :style="{'text-align':data.horizontalAlign,'vertical-align':data.verticalAlign,'font-size':data.size*fontUnit+'px'}"
    >
      <span
        :style="{
                      'color':'rgb('+data.color.r+','+data.color.g+','+data.color.b+')'
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
  },
 
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