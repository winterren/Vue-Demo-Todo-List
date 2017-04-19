//存取localStorage
var storage = {
	save(key,value){
		// 把value转成字符串
		localStorage.setItem(key,JSON.stringify(value));
	},
	fetch(key){
		return JSON.parse(localStorage.getItem(key)) || [];
	}
}

// 数据格式
// var list = [
// 	{
// 		title:"起床",
// 		isChecked:true
// 	}
// ];

var list = storage.fetch("mystorage");
//过滤时考虑三种情况all completed uncompleted
var filter = {
	all:function(){
		return list;
	},
	completed:function(){
		return list.filter(function(item){
			return item.isChecked;
		})
	},
	uncompleted:function(){
		return list.filter(function(item){
			return !item.isChecked;
		})
	}
}


// 实例化
var vm = new Vue({
	// 挂载点
	el: ".main",
	// 挂载数据
	data:{
		list: list,
		inputvalue: "", //记录将要添加的数据
		editing:'' ,	//记录正在编辑的数据
		beforeEdit:'',	//记录正在编辑的数据的title
		visibility:"all"//
	},
	watch:{
		list:{
			handler:function(){
				// list变化时执行函数
				storage.save("mystorage",this.list)
			},
			deep:true
		}
	},
	computed:{
		noCheckedLength:function(){
			return this.list.filter(function(item){
						return !item.isChecked;
					}).length
		},
		filterList:function(){
			
			return filter[this.visibility] ? filter[this.visibility](list):list;

		}
	},
	methods:{
		addTodo(e){	//添加任务
			this.list.unshift({
				title: this.inputvalue,
				isChecked: false
			})

			this.inputvalue=""
		},
		deleteTodo(todo){//删除任务
			var index = this.list.indexOf(todo);
			this.list.splice(index,1)
		},
		edit(item){//编辑任务
			//先记录下来编辑前的title，方便esc取消后能重新赋值
			this.beforeEdit = item.title;
			this.editing = item;
		},
		edited(item){//完成编辑
			this.editing = '';
		},
		cancel(item){//取消
			item.title = this.beforeEdit;
			this.editing = '';
		}
	},
	directives:{
			focus:{
				update: function(el,binding){
					if(binding.value){
						el.focus();
					}
				}
			}
		}
})

function watchHashChange(){
	var hash = window.location.hash.slice(1);
	vm.visibility = hash;
}
watchHashChange();
window.addEventListener("hashchange",watchHashChange);