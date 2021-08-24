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
  </div>
</template>

<script>
import { Toast } from "vant";
import Clipboard from "clipboard";
export default {
  name: "Share",
  props: ["id"],
  data() {
    return {
      postid: this.id,
      options: [
        { name: "复制链接", icon: "./images/3.jpg" , description: '你是表白者'},
        { name: "吃瓜复制", icon: './images/2.jpg' , description: '你是吃瓜者'},
        { name: "二维码", icon: "qrcode", description: '还没做呢'},
        { name: "反馈", icon: "qq", description: '给开发者刀片' },
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
            window.open("mqqwpa://im/chat?chat_type=wpa&uin=2109864081&version=1&src_type=web"); //安卓
            // window.open("mqq://im/chat?chat_type=wpa&uin=your QQ&version=1&src_type=web");  //ios
            break;
          case "复制链接":
            getUrl('1',this.id);
            break;
          case "吃瓜复制":
            getUrl('2',this.id);
            break;
          case "二维码":
            Toast('未开放')
            break;

          default:
            Toast("未知");
        }

     function getUrl(a,id){
        var test = window.location.protocol + '//' + window.location.host +'/#/';
          if (a == '1'){
            //这里是表白者返回
             iscopy( `${test}details?id=${id}`);
             Toast('快把链接发给你喜欢的人吧~')
          }
          else{
            //这里是吃瓜返回
            
             iscopy(`${test}details?id=${id}&islooks=666`);
             Toast('快把链接发给你的好朋友吧~')
          }
           //动态拼接分享链接
     }
      

   function iscopy(a){
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

<style>
</style>