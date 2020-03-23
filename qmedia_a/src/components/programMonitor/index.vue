<template>
    <div class="program-monitor">
        <div v-if="programContent&&programContent.programDialogType==0" style="width:100%;height:100%;position:relative">
            <editorPageView 
                :pixelHorizontal='programContent.pixelHorizontal'
                :pixelVertical='programContent.pixelVertical'
                :page='currentPage'
            >
            </editorPageView>
        </div>
        
        <div v-if="programContent&&programContent.programDialogType==1" style="width:100%;height:100%;position:relative">
            <div class="sceneList" v-if="programContent.content.length>=2">
                <ul>
                    <li v-for="(item,index) in programContent.content" :key="index" @click="selectedScene(index)" :class="clickIndex==index?'clickStyle':'sceneStyle'">场景{{index+1}}</li>
                </ul>
            </div>
             <dbFullScreen>
                <editorPageView 
                    :pixelHorizontal='programContent.pixelHorizontal'
                    :pixelVertical='programContent.pixelVertical'
                    :page='selectedPage'
                >
                </editorPageView>
             </dbFullScreen>
            
        </div>
    </div>
</template>

<script>
const CycleQueue = require('../../libs/cyclequeue')
import editorPageView from './editorPageView/index'
import dbFullScreen from '../dbFullScreen/index'
import {mapGetters} from 'vuex'
export default {
        data() {
            return {
                content: null,
                currentPage:null,
                timer:null,
                selectedPage:null,
                clickIndex:0
            }
        },
        computed: {
            ...mapGetters([
                "programContent",
                "selectedIndex"
                    ])
        },
        components: {
            editorPageView,
            dbFullScreen
        },
        created () {
            if(this.programContent&&this.programContent.programDialogType==0){
                this.content = this.programContent.content
                    if (this.content.length !== 0) {
                        this.play(this.content);
                    };
            }
            if(this.programContent&&this.programContent.programDialogType==1){
               this.selectedPage = this.programContent.content[this.selectedIndex]
               if(this.selectedIndex!==0){
                   this.clickIndex = this.selectedIndex
                   this.play([this.programContent.content[this.selectedIndex]])
               } 
               
            }
        },
        methods: {
           play(pages) {
                (function (that) {
                    let cycle = new CycleQueue(pages);
                    that.timer = null;
                    function playNext() {
                        let nextPage = cycle.skipNext();
                        that.currentPage = nextPage;
                        that.timer = setTimeout(playNext, nextPage.stay * 1000);
                    }
                    playNext();
                })(this);
            },
            selectedScene(index){
                this.$store.commit('SELECTED_INDEX',index)
                this.clickIndex = index
                this.selectedPage = this.programContent.content[index]
            },
        },
        watch: {
            "programContent.content":function(newValue, oldValue) {
                if(newValue){
                    this.content = null
                    this.content = newValue
                    if (this.content.length!== 0) {
                        this.selectedScene(0)
                        this.play(this.content);
                    };
                }
            }
        },
        destroyed () {
             //销毁时清除
            if (this.timer !== null) {
                clearTimeout(this.timer);
                this.timer = null;
                this.content = null
            }
        },
    }
</script>

<style lang="less" scoped>
    .program-monitor{
        width:100%;
        height:100%;
        margin-bottom:20px;
    }
    .sceneList{
        width:100%;
        height:45px;
        overflow: auto;
        >ul li{
            display: inline-block;
            width:60px;
            height:30px;
            line-height: 30px;
            text-align: center;
            margin-left:5px;
            border:1px solid #ececec
        }
    }
    .sceneList_full{
        display: none
    }
    .clickStyle{
         background-color:rgb(148, 147, 147);
         color:rgb(255, 255, 255)
    }
    .sceneStyle{
        background-color:rgb(255, 255, 255);
         color:rgb(26, 26, 26)
    }
</style>