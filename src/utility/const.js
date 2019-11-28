/**
 * 页面静态配置
 * 
 */


 //右侧组件列表配置数据
export const components={
    base:[
        { 
            type:'Picture',
            name:'图片',
        },        
        { 
            type:'Video',
            name:'视频',
        },
        { 
            type:'Carousel',
            name:'轮播图',
        }
    ],
    market:[       
        { 
            type:'Event',
            name:'事件',
            disableDrag:true,
        },
        { 
            type:'Goods',
            name:'商品列表',
            disableDrag:true,
        }
    ]
}




//环境配置  dev 开发 | test 测试 | pro 生产
let env='test'

let baseURL=''      //api接口地址
let staticURL=''    //上传的静态素材地址

switch(env){
    case 'dev':
        baseURL='http://localhost:3001'
        staticURL='http://localhost:3001'    
    break;

    case 'test':
        baseURL='https://wodeyouxi.com/ms/landpage'
        staticURL='https://wodeyouxi.com/upload_landpage'    
    break;

    case 'pro':
        baseURL='https://wodeyouxi.com/ms/landpage'
        staticURL='https://wodeyouxi.com/upload_landpage'    
    break;
}

export  {
    baseURL,
    staticURL,
    env,
}