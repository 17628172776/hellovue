<template>
  <div>
    <div id="box-min-noislook">
      <div v-for="(a, index) in postlists" :key="index">
        <!--表白人的名字和被表白者的名字  -->
        <div id="nametext">
          <van-row type="flex" justify="center">
            <van-col span="1"></van-col>
            <van-col span="22">
              <!-- 先留个坑以后埋上 -->
              <span :class="a.gender">{{ a.nickName }}</span>
              <van-icon name="like" color="#ef5b9c" />
              <span :class="a.itsGender">{{ a.toWho }}</span>
            </van-col>
            <van-col span="1"></van-col>
          </van-row>
        </div>

        <!-- 表白内容 -->
        <div id="contents">
          <p
            v-for="(i, index) in picture(a.contents, '\n')"
            :key="index"
            class="i-text"
          >
            {{ `\n` + i }}
          </p>
          <!-- <span> {{  a.contents }}</span> -->
        </div>

        <p id="Photo-text">照片墙</p>

        <!-- 照片 -->
        <div id="imagelist">
          <div
            v-for="(s, index) in picture(a.images, '#')"
            :key="index"
            @click="addimages(picture(a.images), index)"
            class="grid-img"
          >
            <van-image v-if="s" fit="cover" :src="s" show-loading show-error>
            </van-image>
          </div>
        </div>

        <!-- 弹幕 -->
        <dm v-bind:commentList="commentList"> </dm>

        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import dm from "./dm";
import { ImagePreview } from "vant";
export default {
  components: { dm },
  name: "noisLook",
  props: ["postlists", "commentList"],
  data() {
    return {};
  },
  methods: {
    picture(images, fil) {
      //分离路径  传入字符串 返回数组
      let imagesrc = images.split(fil);
      for (var i = 0; i < imagesrc.length; i++) {
        if (imagesrc[i] == undefined || imagesrc[i] == "") {
          imagesrc.splice(i, 1);
          i = i - 1; // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位，
          // 这样才能真正去掉空元素,觉得这句可以删掉的连续为空试试，然后思考其中逻辑
        }
        return imagesrc;
      }
    },
    addimages(s, index) {
      // 得到所传入的 img 节点
      ImagePreview({
        images: s, //接收为数组
        startPosition: index, //图片索引
        closeable: true, //预览可以关闭
      });
    },
  },
};
</script>

<style scoped>
#box-min-noislook {
  margin-bottom: 51px;
}
#nametext-abs {
  border: 2px solid #c2b7b7;
}
#nametext {
  color: #000;
  font-size: 1.5em;
  margin: auto;
  margin-top: 6vh;
  width: 99%;
}

.male {
  display: inline;
  margin-right: 10px;
  margin-left: 20px;
  color: #03a9f4;
  border-bottom: 2px dashed #03a9f4;
  line-height: 30px;
  text-shadow: 0 1px 0 #c9c5c5;
  font-family: "Microsoft YaHei";
}
.female {
  display: inline;
  margin-right: 10px;
  margin-left: 10px;
  color: #ff3333;
  border-bottom: 2px dashed #ff3333;
  line-height: 30px;
  text-shadow: 0 1px 0 #c2b7b7;
  font-family: "Microsoft YaHei";
}
.secrecy {
  display: inline;
  margin-right: 10px;
  margin-left: 10px;
  color: #424242;
  border-bottom: 2px dashed #424242;
  line-height: 30px;
  text-shadow: 0 1px 0 #b1a9a9;
  font-family: "Microsoft YaHei";
}
.grid-img {
  display: inline-block;
  width: 100%;
  height: 100%;
  text-align: center;
  margin-left: 2px;
  margin-right: 2px;
  border-radius: 15px !important;
}
.grid-img:only-child {
  width: 100%;
  height: 100%;
  max-width: 360px;
  max-height: 230px;
  margin: auto;
  border-radius: 10px;
}
.grid-img:nth-child(2n + 1):nth-last-child(2),
.grid-img:nth-child(2n + 2):last-child {
  width: 44vw;
  height: 20vh;
}
.grid-img:nth-child(3n + 1):nth-last-child(3),
.grid-img:nth-child(3n + 2):nth-last-child(2),
.grid-img:nth-child(3n + 3):last-child {
  width: 28vw;
  height: 15vh;
}

.grid-img:nth-child(4n + 1):nth-last-child(4),
.grid-img:nth-child(4n + 2):nth-last-child(3),
.grid-img:nth-child(4n + 3):nth-last-child(2),
.grid-img:nth-child(4n + 4):last-child {
  width: 44vw;
  height: 20vh;
}
#imagelist {
  background-color: rgba(223, 207, 235, 0.411);
  border: 2px solid rgb(199, 195, 195);
  width: 95%;
  margin: auto;
  margin-top: 20px;
  border-radius: 10px;
  background-image: linear-gradient(62deg, #c8e4fb 3%, #ecddfb 82%);
}
#contents {
  color: rgb(66, 64, 64);
  font-size: 1em;
  border: 1px solid rgb(197, 188, 188);
  border-radius: 10px;
  background-color: rgba(244, 239, 245, 0.801);
  min-height: 30vh;
  width: 96%;
  margin: auto;
  margin-top: 30px;
  text-shadow: 0 1px 1.1em rgb(158, 151, 151);
  text-align: left;
  text-indent: 35px;
  overflow: auto;
}
#Photo-text {
  font-size: 1.3em;
  text-shadow: 2px 3px 2px rgb(247, 247, 247);
  color: rgb(71, 65, 65);
}
.i-text {
  margin-top: 10px;
  margin-bottom: 0px;
}
</style>