<template>
  <div>
    <van-row type="flex" style="margin-top: 8px">
      <van-col span="12" ></van-col>

      <van-col span="4"  :style="{ color: iscolors }">
          <van-icon
            name="thumb-circle"
            size="1.5rem"
            @click="addlike(id)"
            ref="likecolor"
          />
          {{ loves }}

        <!-- 展示点赞 -->
      </van-col>

      <van-col span="4"  style="color:#908E8E">
        <van-icon name="chat" size="1.5rem" @click="commmentClike" />
        {{comments}}
        <!-- 展示评论 -->
        <van-popup v-model="show" closeable round  @close="isclose">
          
            <!-- 在Comment组件 -->
            <Comment  v-bind:id="id" />
          
        </van-popup>
      </van-col>

        <!-- 分享 -->
      <van-col span="4" >
        <Share v-bind:id="id" />
      </van-col>
    </van-row>
    <div></div>
  </div>
</template>

<script>
import { Toast } from "vant";
import axios from "axios";
import Comment from "./Comment";
import Share from './Share'
export default {
  components:{Comment,Share},
  name: "belowButton",
  props: ["love", "id" ,"comments"],
  data() {
    return {
      show:false,
      loves: this.love,
      loveColor: JSON.parse(localStorage.getItem(this.id)),
      iscolor: "",
    };
  },
  computed: {
    iscolors() {
      let a = JSON.parse(localStorage.getItem(this.id));
      if (a) {
        return "#FA8E86"; //本地有值为红色
      } else {
        return "#908E8E"; //本地无值为灰色
      }
    },
  },
  methods: {

    commmentClike(){
      this.$bus.$emit('isDisabled',true)
      this.show = true;
    },

    isclose(){
      this.$bus.$emit('isDisabled',false)
    },

    addstyle(a, b) {
      localStorage.setItem(a, JSON.stringify(b));
      //缓存点赞的id值
    },

    addlike(id) {
      if (JSON.parse(localStorage.getItem(this.id)) == undefined) {
        axios({
          method: "post",
          url: "/api/php/action.php",
          data: { act: "liked", post_id: id },
        }).then((res) => {
          if (res.data != "error") {
            this.loves = res.data; //更新点赞数量
            //传入cooke，id加状态
            this.addstyle(this.id, "true");
            setTimeout(() => {
              this.$refs.likecolor.style.color = "#FA8E86";
              //设置点赞后的颜色
            }, 100);
          } else {
            Toast("点赞失败了");
          }
        });
      } else {
        Toast("已经点过赞了");
      }
    },
  },
};
</script>

<style scoped>
.colors {
  color: #fa8e86;
}
.colors1 {
  color: #908e8e;
}
.text-centers {
  display: inherit;
  position: relative;
}

</style>