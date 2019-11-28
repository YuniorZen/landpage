/*！
 * vue's filter directive
*/

import Vue from 'vue'
import {formatDateTime} from '@/utility/'

//千分位分隔符
Vue.filter('toThousands',val=>{
    return (val || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
})

//转换数字
Vue.filter('number',val=>{
    val=val||0
    return parseInt(val)
})

//格式化日期时间 eg:2019-09-24 11:31:06
Vue.filter('formatDateTime', formatDateTime)

