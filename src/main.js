import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'


//默认、基础样式
import './assets/style/normalize.css'
import './assets/style/common.scss'

//路由跳转、权限统一处理
import './router/permission'

//vue过滤器或指令
import './utility/filter'


//按需引入ElementUI
import {
  Row, Col, Button, Switch, Slider, 
  Table,TableColumn, DatePicker, Upload, Input, Radio, 
  Loading,ColorPicker,
  Breadcrumb, BreadcrumbItem, Select, Option, 
  Message, MessageBox, Pagination ,Checkbox,CheckboxGroup,
} from 'element-ui'
Vue.use(Row), Vue.use(Col), 
Vue.use(Button),
Vue.use(Checkbox),
Vue.use(CheckboxGroup),
Vue.use(Switch), Vue.use(Slider),
Vue.use(Table), Vue.use(TableColumn),
Vue.use(DatePicker), 
Vue.use(Upload),
Vue.use(Input),
Vue.use(Radio),
Vue.use(ColorPicker),
Vue.use(Breadcrumb),Vue.use(BreadcrumbItem),
Vue.use(Select), Vue.use(Option),
Vue.use(Loading.directive),
Vue.use(Pagination);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$ELEMENT = { size: 'small'};


Vue.config.productionTip = false

//落地页环境，editor:编辑模式，product:预览或生产环境(事件响应有效)
window.landpage_env='editor'

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
