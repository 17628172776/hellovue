//引入vue
import Vue from 'vue'
//引入app
import App from './App.vue'
// 引入vue-router
import VueRouter from 'vue-router'
//引入路由器
import router from './router'
import {
    Col,
    Row,
    Button,
    Tabbar,
    TabbarItem,
    NavBar,
    List,
    Cell,
    Search,
    Sticky,
    Image as VanImage,
    Lazyload,
    Icon,
    Divider,
    Form,
    Field,
    CellGroup,
    DropdownMenu,
    DropdownItem,
    Switch,
    Uploader,
    PullRefresh,
    ShareSheet,
    Popup,
    Tag,
    Overlay,
    Dialog
} from 'vant';
import { vueBaberrage } from 'vue-baberrage'
import 'vant/lib/index.css';
import axios from 'axios'
import VueQr from "vue-qr"; //二维码生成的插件
Vue.prototype.$axios = axios


//按需引入vant  ui
Vue.use(Col);
Vue.use(Row);
Vue.use(Button);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(List);
Vue.use(Cell);
Vue.use(Search);
Vue.use(Sticky);
Vue.use(VanImage);
Vue.use(Lazyload);
Vue.use(Icon);
Vue.use(Divider);
Vue.use(Form);
Vue.use(Field);
Vue.use(CellGroup);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Switch);
Vue.use(Uploader);
Vue.use(PullRefresh);
Vue.use(ShareSheet);
Vue.use(Popup);
Vue.use(Tag);
Vue.use(Overlay);
Vue.use(Dialog);

//引入qr
Vue.use(VueQr);

//引入vueBaberrage
Vue.use(vueBaberrage);
//关闭vue的生产提示
Vue.config.productionTip = false
Vue.use(VueRouter)
    //创建vue
new Vue({
    el: '#app',
    router: router,
    render: h => h(App),
    beforeCreate() {
        Vue.prototype.$bus = this //安装全局事件总线
    },

})