<template>
  <div class="editor-page-view-multimedia" 
        ref="multimediaDom">
    <img class="media-image" />
    <video class="media-video" preload="auto"></video>
  </div>
</template>

<script>
var CycleQueue = require("../../../libs/cyclequeue");
export default {
  data() {
    return {
      timer: null,
      medias: [],
      multimediaDom: null,
      imageDOM: null,
      videoDOM: null,
      queue: null,
      src:null
    };
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  created () {
     this.src = JSON.parse(localStorage.getItem('userInfo')) ;
  },
  mounted() {
      this.timer = null;
      this.medias = this.data.medias;
      this.multimediaDom = this.$refs.multimediaDom;
      if (this.medias.length != 0) {
        this.imageDOM = this.multimediaDom.getElementsByTagName("img")[0];
        this.videoDOM = this.multimediaDom.getElementsByTagName("video")[0];
        this.videoDOM.muted = !this.data.isMuted;
        this.videoDOM.volume = 0.7;
        this.videoDOM.addEventListener("ended", this.playNext);
        this.queue = new CycleQueue(this.medias);
        console.log(5)
        this.playNext();
      }
  },
  methods: {
    playNext() {
      var media = this.queue.skipNext();
      this.setMedia(media);
    },
    setMedia(media) {
      if (this.timer) {
        window.clearTimeout(this.timer);
      }
      if (media.type === 0&&media.length!=0) {
        //图片
        this.videoDOM.style.display = "none";
        this.videoDOM.src = "";
        this.imageDOM.style.display = "block";
        this.imageDOM.src = this.src.cdnImgUrl+media.path;
        if(this.data.stay){
           this.timer = window.setTimeout(this.playNext, this.data.stay * 1000);
        }else{
          this.timer = null
        }
      } else if (media.type === 1&&media.length!=0) {
        //视频
        this.imageDOM.style.display = "none";
        this.imageDOM.src = "";
        this.videoDOM.style.display = "block";
        this.videoDOM.src = this.src.cdnVideoUrl+media.path;
        this.videoDOM.load();
        this.videoDOM.destroyed = false;
        if (!this.videoDOM.destroyed) {
           this.videoDOM.play();
        }
      }
    }
  },
   watch: {
    'data':function(newValue, oldValue) {
      if(newValue){
        let medias = newValue.medias
        this.multimediaDom = this.$refs.multimediaDom;
        if (medias.length != 0) {
          this.imageDOM = this.multimediaDom.getElementsByTagName("img")[0];
          this.videoDOM = this.multimediaDom.getElementsByTagName("video")[0];
          this.videoDOM.muted = !this.data.isMuted;
          this.videoDOM.volume = 0.7;
          this.videoDOM.addEventListener("ended", this.playNext);
          this.queue = new CycleQueue(medias);
          this.playNext();
        }else{
          this.videoDOM.style.display = "none";
          this.imageDOM.style.display = "none";
          this.videoDOM.destroyed = true;
          this.videoDOM.removeEventListener("ended", this.playNext);
          this.videoDOM.pause()
           if (this.timer) {
            window.clearTimeout(this.timer);
            this.timer = null;
          }
        }
      }
    }
  },
  destroyed() {
    // this.videoDOM.destroyed = true;
    // this.videoDOM.removeEventListener("ended", this.playNext);
    // this.videoDOM.pause()
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }
};
</script>

<style lang="less" scoped>
.editor-page-view-multimedia {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  > .media-image {
    width: 100%;
    height: 100%;
    display: none;
  }

  > .media-video {
    width: 100%;
    height: 100%;
    display: none;

    -o-object-fit: fill;
    object-fit: fill;
  }
}
</style>