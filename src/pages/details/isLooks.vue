<template>
  <div>
    <div name="inquiry">做我对象好不好</div>
    <div>
      <img :src="imgUrl" alt="bui" id="image" />
    </div>
    <div id="sentence">
      {{ contents }}
    </div>
    <div>
      <van-button type="primary" @click="yesButton" class="button-fix"
        >yes
        <van-icon name="like-o" />
      </van-button>
      <van-button type="primary" @click="noButtin" class="button-fix"
        >no
        <van-icon name="cross" />
      </van-button>

      <!-- 同意的弹出 -->
      <van-overlay :show="show" @click="show = false">
        <div class="wrapper" @click.stop>
          <div class="block" />
          <img :src="imgUrl6" alt="" @click="show = false" />
          <div id="baobei">谢谢宝贝~</div>
        </div>
      </van-overlay>

      <!-- 拒绝的弹出 -->
      <van-dialog
        v-model="dialogshow"
        title="警告！"
        :show-cancel-button="isok"
        confirmButtonText="同意"
        cancelButtonText="无情拒绝"
        @confirm="yesButton"
        @cancel="refuse"
        
      >
        <img v-show="isok"  :src="imgUrl7" alt="" @click="dialogshow = false" class="images" />
        <img v-show="!isok"  :src="imgUrl8" alt="" @click="dialogshow = false" class="images" />
      </van-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "isLooks",
  data() {
    return {
      imgUrl: require("../../assets/1.gif"),
      imgUrl6: require("../../assets/6.jpg"),
      imgUrl7: require("../../assets/7.jpg"),
      imgUrl8: require("../../assets/8.jpg"),
      contents:
        "我知道，生活不是童话，所以我不求童话般的结局，只希望拥有一个不完美但却真实的爱情故事。故事的主角：我和你。💕",
      show: false,
      dialogshow: false,
      counting: 0,
      isok:true,
    };
  },

  methods: {
    yesButton() {
      const timer = setTimeout(() => {
        this.show = false;
        this.$bus.$emit("whatlook", false);
        console.log("我离开了");
        clearTimeout(timer);
      }, 1200);
      this.show = true;
    },

    noButtin() {
      this.dialogshow = true;
      
    },

    refuse(){
      this.counting= this.counting+1
      if(this.counting >= 2){
        this.isok=false
      }
      console.log(this.counting)
    }
  },
  beforeDestroy() {
    clearTimeout(); //不知道在干嘛
  },
  mounted() {},
};
</script>

<style scoped>
div[name="inquiry"] {
  color: rgb(27, 27, 27);
  font-size: 1.5em;
  text-shadow: 2px 2px #cfcccc;
  margin-top: 10vh;
  margin-bottom: 3vh;
}
#sentence {
  width: 90%;
  margin: auto;
  margin-top: 20px;
  border: 1px solid #ece6e6;
  border-radius: 12px;
  height: 120px;
  background-color: rgba(247, 225, 225, 0.3);
  margin-bottom: 2vh;
}
#image {
  height: 90%;
  width: 90%;
  margin: auto;
  opacity: 0.95;
  border-radius: 10px;
}
.button-fix {
  margin-top: 3vh;
  margin-right: 8vw;
  margin-left: 8vw;
  width: 25vw;
  height: 5vh;
  background-color: rgb(243, 234, 222, 0.6);
  color: rgb(121, 112, 102);
  font-size: 1.3em;
  border-radius: 10px;
  border: 1px solid #949090;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 142x;
  height: 120px;
  background-color: rgba(248, 248, 248, 0);
}
#baobei {
  margin-left: 9px;
  margin-top: 25px;
  color: azure;
  font-size: 18px;
}
.images{
  width: 320px;
}
</style>