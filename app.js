// 数据格式
var list = [
	{
		title:"起床",
		isChecked:true
	},
	{
		title:"洗脸",
		isChecked:true
	},
	{
		title:"刷牙",
		isChecked:false
	},
	{
		title:"听课",
		isChecked:false
	},
	{
		title:"打盹",
		isChecked:true
	}
];


// 实例化
new Vue({
	// 挂载点
	el: ".main",
	// 挂载数据
	data:{
		list: list,
		inputvalue: "", //记录将要添加的数据
		editing:'' ,	//记录正在编辑的数据
		beforeEdit:'',	//记录正在编辑的数据的title
		cat:"all"
	},
	computed:{
		noCheckedLength:function(){
			return this.list.filter(function(item){
						return !item.isChecked;
					}).length
		}
	},
	methods:{
		addTodo(e){	//添加任务
			// 向list中添加任务
			/*
				{
					title:
				}
			*/

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
		},
		cate(item){
			switch(this.cat){
				case "all":
					return item;
				case "completed":
					return item.isChecked===true;
				case "uncompleted":
					return item.isChecked===false;
			}
			
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

