<template>
    <div class="editor-element-date editor-element-full editor-element-table">
        <div style="white-space: nowrap;display:table-cell"
            :style="{'font-size':data.size*fontUnit+'px','text-align':data.horizontalAlign,'vertical-align':data.verticalAlign}">
            <span :style="{'color':'rgb('+data.color.r+','+data.color.g+','+data.color.b+')'}">{{nowTime|editorDateTimeFormatterFilter(data.formatter)}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            pixelHorizontal: {
                type: Number,
                default: ()=>{}
            },
            pixelVertical: {
                type: Number,
                default: ()=>{}
            },
            data: {
                type: Object,
                default: ()=>{}
            },
        },
                data() {
            return {
                nowTime: new Date(),
                maxPixel:null,
                fontUnit:null
            }
        },
        created() {
            this.nowTimes()
            this.maxPixel = this.pixelHorizontal > this.pixelVertical ? this.pixelHorizontal : this.pixelVertical;
            this.fontUnit = this.maxPixel / 1000;
        },
        methods: {
            nowTimes(){
                this.nowTime = new Date()
                setInterval(this.nowTimes,997);
                this.clear()
            },
            clear(){
                clearInterval(this.nowTimes)
                this.nowTimes = null;
            }
        },
    }
</script>

<style lang="less" scoped>
// .editor-page-view-time {
//   width: 100%;
//   height: 100%;


//   > .version {
//     position: relative;
//     width: 100%;
//     height: 100%;

//     > .text {
//       position: absolute;
//       white-space: nowrap;
//       line-height: 1;
//     }
//   }

// }
 .editor-element-full {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .editor-element-table {
        display: table;
        table-layout: fixed;
    }
</style>