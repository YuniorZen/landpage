/*!
 * 所有state的同步设置
 * 
 */
import Vue from 'vue'
import {arrayFindObject, arrayRemoveObject} from '@/utility/'

/*eslint no-unused-vars: "off"*/
export default {
	//设置当前激活组件类型
	setActiveComponent(state, component){		
		state.activeComponent=component
	},

	//页面中直接添加组件
	addComponent(state, component){
		state.page.components.push(component)
	},

	//参考页面中组件位置添加组件  relativeType:child|pre|next
	addRelativeComponent(state, {relativeType, relativeComponent, component}){
		let components=state.page.components

		let index=components.findIndex((item,index)=>{
			if(item.id===relativeComponent.id){
				return true
			}
		})
		
		switch(relativeType){
			//父节点
			case 'child':			
				if(components[index].hasOwnProperty('children')){
					components[index].children.push(component)
				}else{
					Vue.set(components[index], 'children', [component])
				}								
			break;
			//上个兄弟节点
			case 'pre':			
				components.splice(index, 0, component)
				
			break;
			//下个兄弟节点
			case 'next':			
				components.splice(index+1, 0, component)				
			break;		
		}
	},

	//页面中移除组件
	removeComponent(state, component){
		const components=state.page.components

		//查找所有组件,包含子组件,并移除
		let index=-1
		for(let i=0,item;i<components.length;i++){
			item=components[i]
			if(item.id==component.id){
				components.splice(i,1), index=i
				break
			}else if(item.children){
				for(let j=0;j<item.children.length;j++){
					if(item.children[j].id==component.id){
						item.children.splice(j,1),index=i,i=components.length
						break;
					}
				}				
			}
		}	

		if(index!=-1){
			state.page.components=components
			//当前激活组件替换为页面级
			state.activeComponent=state.defaultComponent
		}
	},

	//重置为默认组件
	resetActiveComponent(state, data){
		state.activeComponent=state.defaultComponent
	},

	//设置对应组件属性值
	setComponentProp(state, data){
		const components=state.page.components
		//查找所有组件包含子组件
		let result=null,index
		components.find((item, ii)=>{
			if(item.id==data.id){
				return result=item,index=ii
			}else if(item.children){
				item.children.find(child=>{
					if(child.id==data.id){
						return result=child,index=ii
					}
				})
			}
		})	

		if(result){
			if(result.hasOwnProperty(data.prop)){			
				result[data.prop]=data.newVal
				Vue.set(state.page.components, index, components[index])					
			}else{				
				Vue.set(result, data.prop, data.newVal)
			}			
		}		
	},

	//右键更新组件的索引顺序
	updateComponentIndex(state, data){
		let {type, component}=data, components=state.page.components

		let index=components.findIndex((item,index)=>{
			if(item.id===component.id){
				return true
			}
		})

		if(index!=-1){
			switch(type){
				//上移
				case 'pre':
					if(index!=0){
						components.splice(index, 1)
						components.splice(index-1, 0, component)
					}				
				break;
				//下移
				case 'next':
					if(index!=components.length-1){
						components.splice(index, 1)
						components.splice(index+1, 0, component)
					}	
				break;
				//置顶
				case 'top':
					if(index!=0){
						components.splice(index, 1)
						components.splice(0, 0, component)
					}
				break;
				//置底
				case 'bottom':
					if(index!=components.length-1){
						components.splice(index, 1)
						components.splice(components.length, 0, component)
					}	
				break;
			}
		}		
	},

	//右键更新层级子组件的层级关系
	updateComponentLevel(state, {component,type}){
		let components=state.page.components,index1=-1,index2=-1

		for(let i=0;i<components.length;i++){
			if(components[i].children&&components[i].children.length>0){
				let index=components[i].children.findIndex(item=>{
					if(item.id==component.id){
						return true
					}
				})
				if(index!=-1){
					index1=i,index2=index
					break
				}
			}
		}
		
		if(index2!=-1){
			switch(type){
				//上一层
				case 'pre':
					if(index2!=components[index1].children.length-1){
						components[index1].children.splice(index2, 1)
						components[index1].children.splice(index2+1, 0, component)
					}				
				break;
				//下一层
				case 'next':
					if(index2!=0){
						components[index1].children.splice(index2, 1)
						components[index1].children.splice(index2-1, 0, component)
					}	
				break;			
			}

			Vue.set(state.page.components,index1,components[index1])
		}
	},

	//设置页面属性值,支持两级属性设置
	setPageProp(state, data){
		const page=state.page

		if(data.multi){
			//二级属性处理
			let props=data.prop.split('.')
			if(page.hasOwnProperty(props[0])){
				page[props[0]][props[1]]=data.newVal
			}else{
				Vue.set(page, props[0], {[props[1]]:data.newVal})
			}
		}else{
			if(page.hasOwnProperty(data.prop)){
				page[data.prop]=data.newVal
			}else{				
				Vue.set(page, data.prop, data.newVal)
			}
		}					
	},

	//设置右键菜单
	showContextMenu(state, data){
		const contextMenu=state.contextMenu
		contextMenu.show=true
		contextMenu.top=data.top
		contextMenu.left=data.left
	}
}
