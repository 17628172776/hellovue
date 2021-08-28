<template>
  <div>
    <van-icon
      name="share"
      size="1.5rem"
      @click="showShare = true"
      color="#908E8E"
    />
    <van-share-sheet
      v-model="showShare"
      title="分享给那个TA"
      :options="options"
      @select="onSelect"
      class="copyData"
    />

    <van-dialog v-model="show" title="保存或分享二维码"  >
      <div class="imagabs">
      <vue-qr
        v-show="urlisshow"
        :text="dataurl"
        :bgSrc="bgurl1"
        :size="300"
        :correctLevel="2"
        :dotScale="0.45"
        :margin="300"
        autoColor
        qid="testid"
      ></vue-qr>
      </div>
    </van-dialog>
    <!-- 二维码生成的地方 -->
  </div>
</template>

<script>
import VueQr from "vue-qr";
import { Toast } from "vant";
import Clipboard from "clipboard";
export default {
  components: { VueQr },
  name: "Share",
  props: ["id"],
  data() {
    return {
      show: false,   //对话框是否展示
      urlisshow: false,  //二维码是否展示
      dataurl: window.location.protocol + "//" + window.location.host + "/#/" , //二维码的文本链接
      postid: this.id,   //id
      bgurl1:'',  //传入背景图片地址
      options: [
        { name: "复制链接", icon: "./images/3.jpg", description: "你是表白者" },
        { name: "吃瓜复制", icon: "./images/2.jpg", description: "你是吃瓜者" },
        { name: "表白者二维码", icon: "qrcode", description: "你是表白者" },
        { name: "吃瓜者二维码", icon: "qrcode", description: "你是吃瓜者" },
        { name: "反馈", icon: "qq", description: "给开发者刀片" },
      ],
      showShare: false,
    };
  },
  methods: {
    onSelect(option) {
      //复制链接到剪切板
      // var tests = window.location.protocol  //获取协议头  //http:
      // var tests = document.domain;  //获取到 域名 localhost
      // var tests =  window.location.host;  //获取到 localhost:8080 带端口
      // 拼接
      switch (option.name) {
        case "反馈":
          window.open(
            "mqqwpa://im/chat?chat_type=wpa&uin=2109864081&version=1&src_type=web"
          ); //安卓
          // window.open("mqq://im/chat?chat_type=wpa&uin=your QQ&version=1&src_type=web");  //ios
          break;
        case "复制链接":
          getUrl("1", this.id);
          break;
        case "吃瓜复制":
          getUrl("2", this.id);
          break;
        case "表白者二维码":
           this.dataurl = window.location.protocol + "//" + window.location.host + "/#/"+'details?id='+this.id;
           this.bgurl1 = './images/11.jpg'
          this.show = true
          this.urlisshow = true;
          break;

        case "吃瓜者二维码":
          this.dataurl = window.location.protocol + "//" + window.location.host + "/#/"+'details?id='+this.id +'&islooks=666';
          this.bgurl1 = './images/10.jpg'
          this.show = true
          this.urlisshow = true;
          break;

        default:
          Toast("未知");
      }

      function getUrl(a, id) {
        var test =
          window.location.protocol + "//" + window.location.host + "/#/";
        if (a == "1") {
          //这里是表白者返回
          iscopy(`${test}details?id=${id}`);
          Toast("快把链接发给你喜欢的人吧~");
        } else {
          //这里是吃瓜返回

          iscopy(`${test}details?id=${id}&islooks=666`);
          Toast("快把链接发给你的好朋友吧~");
        }
        //动态拼接分享链接
      }

      function iscopy(a) {
        //用于操作复制传入的Url
        let clipboard = new Clipboard(".copyData", {
          text: function () {
            return a;
          },
        });
        clipboard.on("success", () => {
          console.log("成功复制了链接");
          // 释放内存
          clipboard.destroy();
        });
        clipboard.on("error", () => {
          // 不支持复制
          Toast("你的浏览器不支持请手动复制");
          // 释放内存
          clipboard.destroy();
        });
      }

      this.showShare = false;
    },

    copy() {},
  },
};
</script>

<style scoped>
.imagabs{
  margin: auto;
  text-align: center;
}
</style>