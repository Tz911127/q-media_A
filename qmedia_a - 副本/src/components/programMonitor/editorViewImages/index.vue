<template>
    <div class="editor-page-view-carousel">
        <img class="editor-element-full editor-element-absolute"
                v-if="data.images.length===1"
                :src="data.images[0].path|editorImageUrlFilter(data.images[0].type)">
            <div class="editor-element-full" v-if="data.images.length>1">
                <img class="editor-element-full editor-element-absolute backface-hidden"
                    v-for="(image,index) in data.images"
                    :key="index"
                    :src="image.path|editorImageUrlFilter(image.type)"
                    v-show="data.disableAnimation?index===nextIndex:(index===prevIndex||index===nextIndex)"
                    :style="{'animation':data.disableAnimation?'':(index===nextIndex?inAnimation:outAnimation)+' '+data.duration+'ms forwards'}">
            </div>
    </div>
</template>

<script>
    const {getEntryAnimation, getLeaveAnimation} = require('../../../libs/imagesAnimations')
    export default {
        data() {
            return {
                imagesArr: [],
                prevIndex:null,
                nextIndex:null,
                timer:null,
                inAnimation:null,
                outAnimation:null
            }
        },
        props: {
            data: {
                type: Object,
                default: ()=>{}
            },
        },
        created () {
            if(typeof this.data.disableAnimation=='undefined'){
                this.data.disableAnimation = false
            }
            if(this.data.images.length&&this.data.images.length>1){
                this.prevIndex = this.data.images.length-1
                this.nextIndex = 0
            }
            this.doChangeWithAnimation();
            this.timer = this.createTimerWithAnimation();
        },
         methods: {
            doChangeWithAnimation() {
                    this.inAnimation = getEntryAnimation(this.data.animation.inId).value;//进场动画
                    this.outAnimation = getLeaveAnimation(this.data.animation.outId).value;//出场动画
                    let imageCount = this.data.images.length;
                    if (imageCount === 0) {
                        this.prevIndex = -1;
                        this.nextIndex = 0;
                    } else {
                        this.prevIndex = this.nextIndex;
                        this.nextIndex = (this.nextIndex + 1) % imageCount;
                    }
                },
            createTimerWithAnimation() {
                let _this = this
                    return setTimeout(function playingNext() {

                        _this.doChangeWithAnimation();

                        _this.timer = setTimeout(playingNext, _this.getInterval());

                    }, _this.getInterval());
                },

            getInterval() {
                    return this.data.stay * 1000 + (this.data.disableAnimation ? 0 : this.data.duration);
                }
        }
    }
</script>

<style lang="less" scoped>
.editor-page-view-carousel{
    width: 100%;
    height: 100%
}
    .editor-element-full {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
     .editor-element-relative {
        position: relative;
    }
    .editor-element-absolute{
        position: absolute;
        left: 0;
        top: 0;
    }
    .preserve3d {
        -webkit-transform-style: preserve-3d;
        -moz-transform-style: preserve-3d;
        -ms-transform-style: preserve-3d;
        transform-style: preserve-3d;
    }
      .backface-hidden {
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        -ms-backface-visibility: hidden;
        backface-visibility: hidden;
      }
</style>