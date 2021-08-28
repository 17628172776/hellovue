//该文件专门用于创建路由器
import VueRouter from 'vue-router'
import Main from '../components/main/Main'
import Saylove from '../pages/Saylove'
import myHomes from '../pages/myHomes/myHomes'
import Dynamic from '../pages/Dynamic'
import Details from '../pages/details/Details'

export default new VueRouter({
        routes: [{
                path: '/',
                component: Main,
                meta: {
                    keepAlive: true, //此组件需要展示
                    isBack: true, //用于判断是否显示标
                }
            },
            {
                name: 'main',
                path: '/main',
                component: Main,
                meta: {
                    keepAlive: true, //此组件需要展示
                    isBack: true, //用于判断是否显示标
                },
            },

            {
                name: 'details',
                path: '/details',
                component: Details,
                meta: {
                    //详情页需要替换掉mian，不能是子路由
                    keepAlive: true, //此组件不需要展示
                    isBack: false, //用于判断是否显示标题
                }
            },

            {
                name: 'saylove',
                path: '/saylove',
                component: Saylove,
                meta: {
                    keepAlive: true, //此组件不需要展示
                    isBack: true, //用于判断是否显示标
                }
            },
            {
                name: 'myhomes',
                path: '/myhomes',
                component: myHomes,
                meta: {
                    keepAlive: true, //此组件不需要展示
                    isBack: true, //用于判断是否显示标
                }
            },
            {
                name: 'dynamic',
                path: '/dynamic',
                component: Dynamic,
                meta: {
                    keepAlive: true, //此组件不需要展示
                    isBack: true, //用于判断是否显示标
                }
            }


        ],
    })
    //解决路由多次报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)

}