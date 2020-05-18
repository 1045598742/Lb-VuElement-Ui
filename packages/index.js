//用来把组件全部收集起来
import Button from "./Button.vue"; //按钮组件
import Pagination from "./Pagination.vue"; //分页组件
import Swiper from "./Swiper.vue";
import SwiperItem from "./SwiperItem.vue";
import Tree from "./Tree.vue";
import Select from "./Select.vue";
import Option from "./Option.vue";
import Input from "./Input.vue";
import DatePicker from "./Date-Picker.vue";
import Switch from "./switch.vue";
import './cssstyle/index.scss'

//把所有组件存储起来

const componentList = [];
let componentsRequire = require.context('../packages', false, /\.vue$/);
componentsRequire.keys().forEach(key => {
    const component = componentsRequire(key).default;
    if (component.install) return;
    component.install = Vue => {
        Vue.component(component.name, component)
    };
    componentList.push(component);
})

const install = Vue => {
    //按需引入
    //判断我们的组件是否安装
    if (install.installed) return;
    install.installed = true;
    componentList.map(component => Vue.use(component))
}

if (typeof window !== 'undefined' && window.Vue) {
    install()
}

// 整体导出 用户全部引入
export default {
    install
}

// 按需引入
export {
    Button,
    Pagination,
    Swiper,
    SwiperItem,
    Tree,
    Select,
    Option,
    Input,
    DatePicker,
    Switch
}