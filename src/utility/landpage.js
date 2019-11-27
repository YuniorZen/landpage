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