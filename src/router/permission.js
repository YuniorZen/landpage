import router from './index' 

router.beforeEach((to, from, next) => {
    //标题设置
    if(to.meta.title){
        document.title=to.meta.title
    }
    
    next()
})
