### 落地页管理系统
> 落地页管理系统是提供给运营与设计人员使用的营销活动管理平台，通过拖拽UI组件生成可维护的落地页面在小程序及H5端实时展现。

- [在线体验管理系统](https://yuniorzen.github.io/landpage/dist/)
- 我的一篇开发实践分享 [可视化页面编辑管理系统开发实践分享](https://github.com/YuniorZen/landpage)

### 技术栈
- 后端技术栈 node+Koa+mongodb，提供落地页的更删改查API服务、素材的上传更新及有效期定时检测等。 
- 前端技术栈 Vue+Vuex+Vue-route+EmenetUI+Axios，开发实现组成页面所需的基础组件及业务营销组件。 


### 项目目录说明
```
src							
|-- App.vue								
|-- main.js                       // 项目入口
|-- components                    // 公共组件目录
|   |-- BreadCrumb                	// 面包屑导航组件
|   |   |-- breadcrumb.scss
|   |   |-- index.vue
|   |-- Carousel                  	// 轮播图组件
|   |   |-- carousel.scss
|   |   |-- index.vue
|   |-- CarouselSet               	// 轮播图属性编辑组件
|   |   |-- index.vue
|   |-- ContextMenu               	// 右键菜单组件
|   |   |-- contextmenu.scss
|   |   |-- index.vue
|   |-- Event                     	// 事件组件
|   |   |-- event.scss
|   |   |-- index.vue
|   |-- EventSet                  	// 事件属性编辑组件
|   |   |-- index.vue
|   |-- Goods                     	// 商品组件
|   |   |-- goods.scss
|   |   |-- index.vue
|   |-- GoodsSet                  	// 商品属性编辑组件
|   |   |-- index.vue
|   |-- HeadInfo                  	// 头部显示组件
|   |   |-- headinfo.scss
|   |   |-- index.vue
|   |-- Picture                   	// 图片组件
|   |   |-- index.vue
|   |   |-- picture.scss
|   |-- PictureSet                	// 图片属性编辑组件
|   |   |-- index.vue
|   |-- Video                     	// 视频组件
|   |   |-- index.vue
|   |   |-- video.scss
|   |-- VideoSet                  	// 视频属性编辑组件
|       |-- index.vue
|-- pages                         // 页面目录
|   |-- LandPage                  	// 落地页渲染页面
|   |   |-- index.vue
|   |   |-- landpage.scss
|   |-- Login                     	// 登陆页面
|   |   |-- index.vue
|   |   |-- login.scss
|   |-- PageCreate                	// 落地页创建页面
|   |   |-- index.vue
|   |   |-- pagecreate.scss
|   |   |-- components            	// 创建页面分成左侧组件列表、中间窗口渲染组件、右侧属性编辑组件
|   |       |-- pageCenter        	// 中间窗口渲染组件
|   |       |   |-- index.vue
|   |       |   |-- pagecenter.scss
|   |       |-- pageRight         	// 右侧属性编辑组件
|   |           |-- index.vue
|   |           |-- pageright.scss
|   |-- PageEditor                	// 落地页编辑页面，共享创建页面，根据路由判断实现不同业务需求
|   |   |-- index.vue
|   |   |-- pageeditor.scss
|   |-- PageList                  	// 落地页列表页面（新建、编辑、删除、状态管理等）
|   |   |-- index.vue
|   |   |-- pagelist.scss
|   |-- PagePreview               	// 落地页预览页面
|       |-- index.vue
|       |-- pagepreview.scss
|-- assets                        // 资源目录（样式文件）
|   |-- style
|       |-- animate.css
|       |-- common.scss
|       |-- normalize.css
|       |-- var.scss
|-- http                          // http请求的接口与方法
|   |-- index.js
|   |-- request.js
|-- router                        // 页面路由目录
|   |-- index.js
|   |-- permission.js
|-- store                         // vuex状态管理目录
|   |-- actions.js
|   |-- index.js
|   |-- mutations.js
|   |-- state.js
|-- utility                       // 常用工具类函数与静态配置文件目录
	|-- const.js
	|-- filter.js
	|-- index.js
	|-- landpage.js
```


### 落地页管理系统功能
- 页面的可维护（新建、编辑、删除、状态管理等）。
- 页面的常见功能或属性编辑（标题，背景、有效期、微信自定义分享、返回顶部功能等）。
- 组成页面的元素组件化，可自由拖拽组装，编辑修改组件属性。
- 页面结构数据化，客户端根据数据动态渲染落地页面。


### 待完善的功能
- 逐步实现事件组件、商品组件等。
- 小程序端的渲染实现（数据结构相同，需使用小程序语法实现），目前只实现H5端。


### 运行说明
```
//下载
git clone https://github.com/YuniorZen/landpage.git

//安装依赖
cd landpage
npm install

//启动本地服务 localhost:8080
npm run dev

//构建打包
npm run build
```


### 代码相关
```
1. 
代码规范使用eslint官方推荐，编码时注意开发控制台的提示，参照规范协作开发。
具体编码规则见官方标绿箭头 http://eslint.cn/docs/rules/

2.
组件基于750设计宽度，1rem=100px

3.
zindex层级 -1，0，10，100，1000，...

```