
/*！
 * 公共函数文件
 * 
*/

/**
 * 生成唯一key
 * @method uniqueKey
 * 
 * @returns
 * {String}  唯一的随机戳
 * 
 * @author Yunior
 */
export const uniqueKey =()=>{
    return Math.random().toString(32).slice(2)
}


/**
 * 在数组arr里查找prop为val的对象
 * @method arrayFindObject
 * 
 * @params
 * arr  {Array} 要查找的对象数组
 * prop {String} 要查找对象的属性
 * val  {String|Number} 要查找对象的属性值
 * 
 * @returns
 * {Object} 查找到的对象
 * 
 * @author Yunior
 * */
export const arrayFindObject=(arr,prop,val)=>{
    let result;
    if(Object.prototype.toString.call(arr)!=='[object Array]'||arr.length==0) return result

    result=arr.find((item,index)=>{
        if(item[prop]===val){
            return true
        }
    })
    return result
}


/**
 * 在数组arr里移除prop为val的对象
 * @method arrayRemoveObject
 * 
 * @params
 * arr  {Array} 要移除的对象数组
 * prop {String} 要移除对象的属性
 * val  {String|Number} 要移除对象的属性值
 * 
 * @returns
 * {Boolean} 是否移除成功
 * 
 * @author Yunior
 * */
export const arrayRemoveObject=(arr,prop,val)=>{
    let index;
    if(Object.prototype.toString.call(arr)!=='[object Array]'||arr.length==0) return

    index=arr.findIndex((item,index)=>{
        if(item[prop]===val){
            return true
        }
    })
    
    if(index!=-1){
        arr.splice(index,1)
        return true
    }else{
        return false
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




/**
 * 常规数据格式判断工具对象
 * @Object validataUtil
 * 
 * @author Yunior
 */
export const validateUtil = {
    isPhone(number){
        return /^1[3,4,5,6,7,8,9]\d{9}$/.test(number)
    },
    isEmpty(str){
        return !String(str||'').trim()
    },
    isUrlKey(str){
        return /^[a-zA-Z\d_]+$/.test(str)
    }
}




/**
 * 格式化日期时间 eg:2019-09-24 11:31:06
 * @method formatDateTime
 * 
 * @params
 * time  {Number}} 需要格式化的时间戳
 * 
 * @returns
 * {String} 格式化的时间字符串
 * 
 * */
export const formatDateTime = time => {
    let date=new Date(time*1)
    let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds();

    let formatNumber = n => {
        n = n.toString()
        return n[1] ? n : '0' + n
    }
  
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
  
 
  