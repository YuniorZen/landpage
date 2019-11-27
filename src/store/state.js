/**!
 * 组件间需要共享的全部状态
 * 
 */

const defaultComponent={type:'page',name:'页面'}

export default {
    //默认组件
    defaultComponent,

    //当前激活的组件,默认是整个页面
    activeComponent:defaultComponent,

    //当前页面数据
    page:{
        //页面名称
        name:'',
        //页面标题
        title:'',
        //页面唯一的key
        urlKey:'',
        //是否需要有效期
        needExpire:false,
        expireDate:'',  
        //额外功能字段
        extra:{
            //页面背景色
            backgroundColor:'',
            //是否需要返回顶部按钮
            needBackTop:false,
            backTopImage:'',
            //是否需要自定义分享
            needShare:false,
            shareText:'',
            shareImage:'',
        },
        //页面中的组件
        components:[

        ]
    },

    //右键菜单状态
    contextMenu:{
        top:0,
        left:0,
        //菜单类型
        type:'component',
        //显示或隐藏右键自定义菜单
        show:false
    }
    
}
