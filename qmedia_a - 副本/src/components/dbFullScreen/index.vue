<template>
    <div class="dmbd-full-screen"
    :class="{isFullScreen:'full-screen'}">
    <slot></slot>
    
    <button class="btn-fullscreen enter-full icon iconfont iconfangda"
            title="进入全屏"
            v-if="!isFullScreen"
            @click="requestFullScreen($event)">
    </button>
    <button class="btn-fullscreen enter-full icon iconfont iconsuoxiao1"
            title="退出全屏"
            v-show="isFullScreen"
            @click="cancelFullScreen($event)">
    </button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isFullScreen: false
            }
        },
        created () {
            document.addEventListener('fullscreenchange', this.fullscreenchange, false);
            document.addEventListener('webkitfullscreenchange', this.webkitfullscreenchange, false);
            document.addEventListener('mozfullscreenchange', this.mozfullscreenchange, false);
            document.addEventListener('msfullscreenchange', this.msfullscreenchange, false);
        },
        methods: {
                fullscreen(isFull) {
                        this.isFullScreen = isFull;
                        this.$root.eventHub.$emit('resize');
                },

                fullscreenchange() {
                    this.fullscreen(document.fullscreen);
                },

                webkitfullscreenchange() {
                    this.fullscreen(document.webkitIsFullScreen);
                },

                mozfullscreenchange() {
                    this.fullscreen(document.mozFullScreen);
                },

                msfullscreenchange() {
                    this.fullscreen(document.msFullscreenElement);
                },
                //全屏
                requestFullScreen($event) {
                    var node = $event.target.parentNode;
                    var requestFullScreen = node.requestFullScreen
                        || node.webkitRequestFullScreen
                        || node.mozRequestFullScreen
                        || node.msRequestFullScreen;

                    if (requestFullScreen) {
                        requestFullScreen.call(node);
                    } else if (typeof ActiveXObject !== 'undefined') {
                        var wscript = new ActiveXObject('WScript.Shell');
                        wscript.SendKeys("{F11}");
                    }
                    this.isFullScreen = true;
                },

                //取消全屏
                cancelFullScreen($event) {
                    var cancelFullScreen = document.cancelFullScreen
                        || document.webkitCancelFullScreen
                        || document.mozCancelFullScreen
                        || document.exitFullScreen;

                    if (cancelFullScreen) {
                        cancelFullScreen.call(document);
                    } else if (typeof ActiveXObject !== 'undefined') {
                        var wscript = new ActiveXObject('WScript.Shell');
                        wscript.SendKeys("{F11}");
                    }
                    this.isFullScreen = false;
                }
        },
        destroyed () {
            document.removeEventListener('fullscreenchange', this.fullscreenchange, false);
            document.removeEventListener('webkitfullscreenchange', this.webkitfullscreenchange, false);
            document.removeEventListener('mozfullscreenchange', this.mozfullscreenchange, false);
            document.removeEventListener('msfullscreenchange', this.msfullscreenchange, false);
        },
    }
</script>

<style lang="less" scoped>
 .dmbd-full-screen {
  position: relative;
  width: 100%;
  height: 100%;

  &.full-screen {
    background-color: black;
  }

  > .btn-fullscreen {
    position: absolute;
    right: 0;
    top: 0px;
    width: 40px;
    height: 40px;

    font-size: 20px;
    cursor: pointer;
    border: none;
    outline: none;

    &.enter-full {
      color: white;
      background-color: rgba(0, 0, 0, 0.5);
      &:hover {
        background-color: rgba(0, 0, 0, 0.7);
      }
    }

    &.exist-full {
      color: black;
      background-color: rgba(255, 255, 255, 0.5);
      &:hover {
        background-color: rgba(255, 255, 255, 0.7);
      }
    }
  }
}
</style>