<template>
    <div class="editor-page-view"
            ref="editorPageView">
         <!-- <el-tooltip class="item" effect="dark" content="双击全屏显示" placement="right"> -->
         <div class="program-view"
                :style="scale|editorProgramViewStyle(pixelHorizontal,pixelVertical)">
                <!-- 场景背景层 -->
                <div class="background-container-view"
                    :style="page.background|editorPageViewBackgroundStyle">
                </div>
                <div class="elements-container-view"
                     @mousedown="$event.preventDefault()">
                    <div class="element-layout-view"
                        v-for ="(ele,index) in page.elements"
                        :key="index"
                        :style="ele.layout|editorElementViewLayoutStyle(ele)">
                        <div class="element-background-view"
                             :style="ele.background|editorElementBackgroundStyle(ele.border,pixelHorizontal,pixelVertical)">
                             <div class="element-border-view"
                                :style="ele.border|editorElementBorderStyle(pixelHorizontal,pixelVertical,ele)">
                                 <!-- 文字 -->
                                <editorViewTextMarquee
                                        v-if="ele.type==160"
                                        :pixelHorizontal="pixelHorizontal"
                                        :pixelVertical="pixelVertical"
                                        :data="ele.data">
                                </editorViewTextMarquee>
                                 <!-- 时间 -->
                                <editorViewTime
                                        v-if="ele.type==500"
                                        :pixelHorizontal="pixelHorizontal"
                                        :pixelVertical="pixelVertical"
                                        :data="ele.data">
                                </editorViewTime>
                                <!-- 混播 -->
                                <editorViewMultimedia
                                        v-if="ele.type==1400"
                                        :data="ele.data">
                                </editorViewMultimedia>
                                <!-- 图片 -->
                                <editorViewImages
                                        v-if="ele.type==250"
                                        :data="ele.data"
                                >
                                </editorViewImages>
                                <editorViewText
                                    v-if="ele.type==170"
                                    :pixelHorizontal="pixelHorizontal"
                                    :pixelVertical="pixelVertical"
                                    :data="ele.data"
                                    >
                                </editorViewText>
                             </div>
                        </div>
                    </div>
                </div>
         </div>
        <!-- </el-tooltip> -->
    </div>
</template>

<script>
import editorViewTextMarquee from '../editorViewTextMarquee/index'
import editorViewTime from '../editorViewTime/index'
import editorViewMultimedia from '../editorViewMultimedia/index'
import editorViewImages from '../editorViewImages/index'
import editorViewText from '../editorViewText/index'
import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                scale: null,
                dom:null,
                parentDOM:null,
                timer:null
            }
        },
        components: {
            editorViewTextMarquee,
            editorViewTime,
            editorViewMultimedia,
            editorViewImages,
            editorViewText
        },
        props: {
            page: {
                type: Object,
                default: ()=>{}
            },
            pixelHorizontal:{
                type:Number,
                default:()=>{}
            },
            pixelVertical:{
                type:Number,
                default:()=>{}
            }
        },
        created () {
            this.$root.eventHub.$on('resize',()=>{
                this.autoComputeSize()
            });
        },
        mounted () {
                this.dom = this.$refs.editorPageView;
                this.parentDOM = this.dom.parentNode
                this.autoComputeSize()
                window.addEventListener('resize', this.resize, false)
                this.timer = window.setTimeout(this.resize, 0);
        },
        methods: {
            autoComputeSize() {
                    var pWidth = this.parentDOM.clientWidth;//20间距
                    var pHeight = this.parentDOM.clientHeight;//20间距
                    var hSize = this.pixelHorizontal;
                    var vSize = this.pixelVertical;

                    if (hSize / vSize > pWidth / pHeight) {
                        this.scale = pWidth / hSize;
                    } else {
                        this.scale = pHeight / vSize;
                    }
            },
            resize() {
                this.autoComputeSize()
            }
        },
        destroyed () {
             window.removeEventListener('resize', this.resize, false);
             if(this.timer){
                 window.clearTimeout(this.timer);
                 this.timer = null;
             }
        },

    }
</script>

<style lang="less" scoped>
    .editor-page-view{
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .center() {
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
        }

        .border-box() {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }

        > .program-view {
            overflow: hidden;
            background-color: white;
            border: solid 4px #c4c4c4;

            .center();

            > .background-container-view {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            }
             > .elements-container-view {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 0;

            > .element-layout-view {
                position: absolute;
                overflow: visible;

                    > .element-background-view {
                        width: 100%;
                        height:100%;
                        position: absolute;
                        left: 0;
                        right: 0;
                        top: 0;
                        bottom: 0;

                    .border-box();
                        > .element-border-view {
                            width: 100%;
                            height: 100%;
                            position: relative;
                            overflow: hidden;

                        .border-box();
                        }
                    }

                    

                }
                }
            
        }
    }
</style>