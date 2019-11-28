/**！
 * http请求底层类封装
 */

 import request from './request'
 import {baseURL, staticURL} from '@/utility/const'

 export default new class{
    constructor() {
        this.baseURL=baseURL
        this.staticURL=staticURL
        this.uploadURL=`${baseURL}interface/upload`
    }  

    get(uri, params){
        return request.get(`${this.baseURL}${uri}`, {params})
    }

    post(uri, params){
        return request.post(`${this.baseURL}${uri}`, params)
    }

    //获取所有落地页数据
    getAllPage(params){
        return this.post('getAllPage', params)
    }

    //获取指定落地页数据
    getPage(params){
        return this.post('getPage', params)
    }

    //新建落地页数据
    createPage(params){
        return this.post('createPage', params)
    }

    //编辑保存落地页数据
    savePage(params){
        return this.post('savePage', params)
    }

    //逻辑删除落地页
    deletePage(params){
        return this.post('deletePage', params)
    }

    //更新落地页状态
    updatePageStatus(params){
        return this.post('updatePageStatus', params)
    }

 }

