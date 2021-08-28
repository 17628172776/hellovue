<template>
  <!-- 默认展示的大爱心 -->
  <div>
    <div class="box" v-show="isopen" @click="isopen = false">
      <div class="left"></div>
      <div class="right"></div>
      <p class="titletext">点我表白!</p>
    </div>

    <div v-show="!isopen" class="max-box">
      <div class="mini-box">
        <van-divider style="border-color: #dea49e; color: #ff976a"
          >你的信息</van-divider
        >
        <van-field
          v-model="uploadForms.nickName"
          label="你的昵称"
          placeholder="请输入昵称"
          :formatter="checkInput"
          format-trigger="onBlur"
        />
        <van-field
          v-model="uploadForms.tureName"
          label="你的真名"
          placeholder="请输入真名"
          :formatter="checkInput"
          format-trigger="onBlur"
        />
        <van-dropdown-menu>
          <van-dropdown-item v-model="uploadForms.gender" :options="option1" />
        </van-dropdown-menu>
      </div>

      <div class="mini-box">
        <van-divider style="border-color: #dea49e; color: #ff976a"
          >ta的信息</van-divider
        >
        <van-field
          v-model="uploadForms.toWho"
          label="ta的名字"
          placeholder="请输入昵称"
          :formatter="checkInput"
          format-trigger="onBlur"
        />
        <van-dropdown-menu>
          <van-dropdown-item
            v-model="uploadForms.itsGender"
            :options="option1"
          />
        </van-dropdown-menu>
        <div class="center">
          <span
            style="
              align-items: center;
              color: rgb(187, 184, 184);
              font-size: 14px;
            "
            >启用邮件通知</span
          >
          <van-switch
            v-model="checked"
            @click="cleemailinput"
            class="center"
            size="22"
          />
        </div>
        <van-field
          v-show="checked"
          v-model="emailCheck"
          label="ta的邮箱"
          placeholder="输入QQ号，如2109864081"
          :formatter="checkEmailInput"
        />
        <van-dropdown-menu v-show="checked">
          <van-dropdown-item v-model="emailType" :options="option2" />
          <p class="lookEmail" v-show="emailCheck">
            输入邮箱为：{{ emailCheck }}{{ emailType }}
          </p>
          <p class="lookEmail">注意：如果你不选择输入邮箱那么请关闭开关！</p>
        </van-dropdown-menu>
      </div>
      <div class="mini-box">
        <van-divider style="border-color: #dea49e; color: #ff976a"
          >这里写下你的话吧</van-divider
        >
        <van-field
          v-model="uploadForms.contents"
          rows="2"
          autosize
          label="内容"
          type="textarea"
          maxlength="1314"
          placeholder="请输入类容"
          show-word-limit
          :formatter="checkText"
          format-trigger="onBlur"
        />
      </div>
      <div class="mini-box">
        <van-divider style="border-color: #dea49e; color: #ff976a"
          >添加图片</van-divider
        >
        <van-field name="uploader" label="图片上传">
          <template #input>
            <van-uploader
              v-show="uploader"
              v-model="uploader"
              :after-read="afterRead"
              :max-count="4"
            />
          </template>
        </van-field>
      </div>
      <div>
        <div style="margin: 16px">
          <van-button
            round
            block
            color="linear-gradient(to right,#feeeed, #F8D5DE, #feeeed)"
            @click="onSubmit(uploadForms)"
            type="button"
            >提交</van-button
          >
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import axios from "axios";
export default {
  name: "Saylove",
  data() {
    return {
      isopen: true,
      uploader: [],
      nullarr: [],
      uploadForms: {
        nickName: "",
        tureName: "",
        toWho: "",
        gender: "male",
        itsGender: "female",
        contents: "",
        email: "",
        image: "",
        act: "say",
      },
      dialogImageUrl: "",
      // dialogVisible: false,
      // disabled: false,
      option1: [
        { text: "男", value: "male" },
        { text: "女", value: "female" },
        { text: "保密", value: "secrecy" },
      ],
      option2: [
        { text: "@qq.com", value: "@qq.com" },
        { text: "@163.com", value: "@163.com" },
        { text: "@hostmail.com", value: "@hostmail.com" },
        { text: "@yahoo.com", value: "@yahoo.com" },
        { text: "@gmail.com", value: "@gmail.com" },
      ],
      checked: false,
      emailType: "@qq.com",
      emailCheck: "",
    };
  },
  computed: {
    // addEmail(){
    //   var a = this.emailCheck+this.emailType
    //  return console.log(a)
    // }
  },

  methods: {
    cleemailinput() {
      this.emailCheck = "";
    },
    // console(uploadForms) {
    //   console.log(uploadForms);
    // },
    checkInput(value) {
      //过滤数据 输入后格式 用于名字
      return value.replace(/[\s'"*)\d\f\n[\r\t\v=?]/g, "");
    },

    checkEmailInput(value) {
      //过滤数据 可以输入数字 输入前格式 用于邮箱
      return value.replace(/[\s'"*)\f\n\r[\t\v=?]/g, "");
    },
    checkText(value) {
      //过滤数据 过滤单引号 输入前格式  用于表白类容
      return value.replace(/[:#/'"]/g, "");
    },

    onSubmit() {
      if (
        this.uploadForms.nickName &&
        this.uploadForms.toWho &&
        this.uploadForms.contents
      ) {
        if (this.emailCheck) {
          this.uploadForms.email = this.emailCheck + this.emailType;
        } else {
          console.log("没输入邮箱");
        }
        this.nullarr = this.uploadForms;
        // console.log(this.nullarr);
        axios({
          method: "post",
          url: "/api/php/action.php",
          data: this.nullarr,
        }).then((res) => {
          console.log(res);
          if (res.status == 200) {
            Toast.success("表白成功,主页下拉刷新");
            this.checked = "false";
            this.uploader = [];
            this.uploadForms = {
              nickName: "",
              tureName: "",
              toWho: "",
              gender: "",
              itsGender: "",
              contents: "",
              email: "",
              image: "",
            };
          } else {
            Toast("等等再试");
          }
        });
      } else {
        Toast("你的内容还没填呢");
      }
    },
    afterRead(file) {
      // 直接将文件上传至服务器
      if (
        !this.uploadForms.nickName &&
        !this.uploadForms.tureName &&
        !this.uploadForms.contents
      ) {
        this.uploader = [];
        Toast("不能先提交图片哦");
      } else {
        file.status = "uploading";
        file.message = "上传中...";
        axios({
          url: "/api/php/upload.php",
          method: "post",
          data: file,
        }).then((res) => {
          this.uploadForms.image = this.uploadForms.image.concat(
            "#" + res.data
          );
          //拿到返回地址直接追加到表单数组
          file.status = "done";
        });
      }
    },
  },
};
</script>

<style scoped>
.max-box {
  margin-top: 60px;
  margin-bottom: 50px;
  background-color: #f7f7f7;
}
.mini-box {
  background: linear-gradient(to right, #ece8e8, #f7ecee, #f7f2f1, #faf7f6);
  border: 1px solid rgb(243, 224, 217);
  margin: 5px;
  border-radius: 10px 10px 10px 10px;
  padding-bottom: 10px;
  padding-left: 6px;
  padding-top: 10px;
  padding-right: 6px;
  box-shadow: 2px 2px 4px rgb(189, 185, 185);
}

.pict {
  padding: 3%;
}
.center {
  text-align: center;
  display: flex;
  align-items: center; /*定义body的元素垂直居中*/
  justify-content: center; /*定义body的里的元素水平居中*/
}
.lookEmail {
  font-size: 10px;
  color: rgb(187, 184, 184);
}
/* 下面是爱心样式 */
.box {
  width: 50vw;
  height: 63vh;
  margin-top: 33vh;
  margin-left: auto;
  margin-right: auto;
  animation: move 0.3s infinite alternate;

  /*动画名称 运动时间 运动次数infinite表示无限次 alternate往返效果相同*/
}
@keyframes move {
  100% {
    transform: scale(1.1); /*变大1.2倍*/
  }
}
.box .left,
.box .right {
  width: 130px;
  height: 200px;
  background-color: #f7c7d3;
  border-radius: 75px 75px 0 0;
  float: left;
  position: relative; /*相对大div定位*/
  left: 31%;

  /* box-shadow: 0 0 40px rgb(231, 208, 208); 设置阴影效果，其值分别表示水平偏移量，竖直偏移量，阴影大小，颜色 */
}
.box .left {
  transform: rotate(45deg);
}
.box .right {
  transform: rotate(-45deg);
  margin-left: -181px;
}
.titletext {
  position: relative;
  font-size: 2em;
  width: 40vw;
  text-shadow: 1px 2px 1px #f7c7d3;
  color: #ece8e8;
  margin-left: 3vw;
}
</style>