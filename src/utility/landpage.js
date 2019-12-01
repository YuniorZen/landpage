/**！
 * 
 * 落地页客户端展现所需函数
 * 
 */


 
 /**
 * 检测客户端是否小程序环境
 * @method checkMiniProgram
 * 
 * @returns
 * {Promise.resolve({Boolean})} 
 * 
 * @author Yunior
 */
 export const checkMiniProgram=()=>{
    return new Promise((resolve)=>{
        if(/MicroMessenger/i.test(navigator.userAgent)&&window.wx&&wx.miniProgram){ 
            wx.miniProgram.getEnv(function(res) {
                if(res.miniprogram) {
                    resolve(true)
                }else{
                    resolve(false)
                }
            })
        }else{
            resolve(false)
        }
    })   
 }


 /** 375x667特定分辨率下，1rem=100px，rem转换px的比值 */
 export const  rem2px=100


/** 组件的默认视图宽度值 */
export const  viewWidth=375



/**
 * 滚动到页面顶部
 * @method backTop
 * @author Yunior
 * */
export const backTop=()=>{
    let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
        window.requestAnimationFrame(backTop);
        window.scrollTo (0,currentScroll - (currentScroll/5));
    }
}


/**
 * 函数节流限制频次,每time毫秒只会执行一次callback函数
 * @method throttleFn
 * 
 * @params
 * delay {Number} 毫秒数
 * callback   {Function} 待执行的函数
 * @returns
 * 
 * @author Yunior
 * */
export const throttleFn=(delay, callback)=>{
    let timeoutID;
    let lastExec = 0;

    function wrapper() {
        const self = this;
        const elapsed = Number(new Date()) - lastExec;
        const args = arguments;

        function exec() {
            lastExec = Number(new Date());
            callback.apply(self, args);
        }

        clearTimeout(timeoutID);

        if (elapsed > delay) {
            exec();
        } else {
            timeoutID = setTimeout(exec, delay - elapsed);
        }
    }

    return wrapper;
}


/*
 * 按照设计稿宽高比例设定html字体，1rem=100px;
 */
export const calcuFontSize=()=> {
    var win=window,
        designWidth = 375,
        designHeight = 0,
        designFontSize = 100, //1rem=100px        
        root = document.documentElement;
    
    //返回root元素字体计算结果,根据宽度或高度最小的比例选择
    var getFontSize=function() {
        var scale = designHeight !== 0 ? Math.min(win.innerWidth / designWidth, win.innerHeight / designHeight) : win.innerWidth / designWidth;
        return parseInt( scale * 10000 * designFontSize ) / 10000;
    }
    //设置root元素的fontsize
    var setFontSize=function(){
        root.style.fontSize=getFontSize()+'px';
    }
    
    //横竖屏切换或resize改变fontSize，根据需要选择使用
    win.addEventListener("orientationchange", setFontSize, false);
    win.addEventListener("resize", setFontSize, false);
    setFontSize();
}
