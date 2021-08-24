<template>
  <div class="Dmax-box" :style="islook ? conTop1 : conTop2" ref="colorbg">
    <div class="text-box">
      <div>
        <!-- 音乐播放 全局有效 -->
        <div
          @click="close"
          id="music"
        >
          <van-icon name="music-o" id="music-icon" :class="{ an: isPlaying, pause: isPaused }" />
        </div>

        <div class="audio">
          <!--隐藏audio标签-->
          <audio autoplay="autoplay" id="music1">
            <source
              src='https://conputer-1302577130.cos.ap-nanjing.myqcloud.com/MP3/1.mp3'
            />
          </audio>
        </div>
      </div>

      <div v-if="islook">
        <isLooks v-bind:islooks="islook" />
        <!-- 这里是展示表白动画 -->
      </div>

      <div v-if="!islook">
        <noIsLook
          v-bind:postlists="postlists"
          v-bind:commentList="commentList"
        />
        <!-- noislook 这里展示表白信息 -->
      </div>
    </div>
  </div>
</template>

<script>
import isLooks from "./isLooks.vue";
import noIsLook from "./noisLook";
import axios from "axios";
export default {
  name: "Details",
  components: { isLooks, noIsLook },
  data() {
    return {
      id: this.$route.query.id,
      commentList: [], //表白的评论
      postlists: {}, //表白的信息
      islook: true, //状态
      conTop1: {
        backgroundImage: "url(" + require("../../assets/4.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        opacity: "90%",
      },
      conTop2: {
        backgroundImage: "url(" + require("../../assets/5.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      },
      isPlaying: true,
      isPaused: false,
    };
  },
  methods: {
    close() {
      var audio = document.getElementById("music1");
      if (audio.paused) {
        audio.play(); // 播放
        this.isPlaying = true;
        this.isPaused = false;
      } else {
        audio.pause(); // 暂停
        this.isPaused = true;
      }
    },
  },

  mounted() {
    //在这里绑定一个控制是否显示的函数给子组件触发
    this.$bus.$on("whatlook", (data) => {
      this.islook = data;
    });

    if (this.$route.query.islooks === "666") {
      //判断来源是，列表里的详情还是，被邮件通知者的详情
      this.islook = false;
    } else {
      //这里是判断携带错误参数的用户，渲染表白模式
      this.islook = true;
    }
    //这里需要拿到评论放在commentlist数组里面
    axios({
      method: "post",
      url: "/api/php/action.php",
      data: { act: "getComment", post_id: this.id },
    }).then(
      (response) => {
        this.commentList = response.data;
      },
      (error) => {
        console.log("请求失败了", error.message); //错误输出
      }
    );
    //这里是拿到表白的信息放在postlists里面
    setTimeout(() => {
      axios({
        method: "post",
        url: "/api/php/action.php",
        data: { act: "details", post_id: this.id },
      }).then(
        (response) => {
          this.postlists = response.data;
        },
        (error) => {
          console.log("请求失败了", error.message); //错误输出
        }
      );
      console.log("100毫秒后我站起来了");
    }, 100);
  },
  beforeDestroy() {
    this.$bus.$off("whatlook");
    clearTimeout();
    //走了就销毁这个绑定
    console.log("已销毁");
  },

  beforeRouteLeave(to, from, next) {
    // console.log('走了')
    this.$destroy("Details");
    //销毁此组件不需要被缓存s
    next();
  },
};
</script>

<style scopend>
.Dmax-box {
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 99vh;
}
#music {
  /* color: coral;
  background-color: rgb(255, 207, 175);
  border: 1px solid rgb(226, 199, 199); */
  float: right;
}
#music-icon {
  font-size: 2em;
  margin-top: 2vh;
  margin-right: 4vw;
  color: rgb(124, 204, 211);
  background: rgb(250, 248, 248);
  border-radius: 50%;
  /* animation:turn 3s linear infinite;   */
}

@keyframes turn {
  0% {
    -webkit-transform: rotate(0deg);
  }
  25% {
    -webkit-transform: rotate(90deg);
  }
  50% {
    -webkit-transform: rotate(180deg);
  }
  75% {
    -webkit-transform: rotate(270deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

.an {
   animation:turn 3s linear infinite;
}
.pause {
  animation-play-state: paused;
}
</style>