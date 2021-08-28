<template>
  <div>
    <!-- <vue-baberrage
      :isShow="barrageIsShow"
      :barrageList="barrageList"
      :loop="barrageLoop"
    >
      <div v-for="(b, index) in commentList" :key="index">
        <span class="content-text">{{ b.contents + "~~" }}</span>
      </div>
    </vue-baberrage> -->

    <!-- 测试 -->

    <div class="isswitch">
      <van-switch
        v-model="barrageIsShow"
        size="20"
        active-color="#B9A9CD"
        inactive-color="#EDE8F5"
      >
      </van-switch>
    </div>

    <div class="barrages-drop">
      <vue-baberrage
        :isShow="barrageIsShow"
        :barrageList="barrageList"
        :loop="barrageLoop"
        extraWidth="90"
        
      >
      </vue-baberrage>
    </div>
  </div>
</template>

<script>
import { MESSAGE_TYPE } from "vue-baberrage";
export default {
  name: "dm",
  props: ["commentList"],
  data() {
    return {
      commentLists: this.commentList,
      imgUrl8: require("../../assets/8.jpg"),
      barrageIsShow: true, //是否展示弹幕
      barrageLoop: true, //是否开启弹幕循环
      barrageList: [],
    };
  },
  mounted() {
    this.addToLists();
  },
  methods: {
    //源码
    // addToList() {
    //   this.barrageList.push({
    //     id: ++this.currentId, //唯一标识id
    //     msg: this.msg, //弹幕类容
    //     time: 5, //持续时间
    //     type: MESSAGE_TYPE.NORMAL, //弹幕类型
    //     loop: true, //是否循环
    //     throttleGap: 3000, //弹幕节流时间
    //     avatar: this.imgUrl8, //弹幕头像
    //   });
    // },

    //添加弹幕的方法
    addToLists() {
      this.commentList.forEach((a) => {
        this.barrageList.push({
          id: a.id,
          avatar: this.imgUrl8,
          time: Math.floor(Math.random() * 5 + 5),
          barrageStyle: "a" + Math.floor(Math.random() * 4), //这里是自定义样式
          msg: a.contents,
          type: MESSAGE_TYPE.NORMAL,
        });
      });
    },
  },
};
</script>

<style scoped lang="less">
.barrages-drop {
  .a1 {
    border-radius: 100px;
    background: #e6ff75;
    color: #fff;
  }
  .a2 {
    border-radius: 100px;
    background: #75ffcd;
    color: #fff;
  }
  .a3 {
    border-radius: 100px;
    background: #e68fba;
    color: #fff;
  }
  .a4 {
    border-radius: 100px;
    background: #dfc795;
    color: #fff;
  }
  .baberrage-stage {
    position: fixed;
    margin-top: 10px;
    width: 99vw;
    height: 97vh;
    // overflow: hidden;
    bottom: 0;
  }
}
.isswitch {
  position: fixed;
  top: 0px;
  left: 10px;
}
</style>