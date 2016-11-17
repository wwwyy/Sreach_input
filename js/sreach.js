(function(d){
	//功能划分:
	//1）焦点ul展开（刚才选中的要显示黑色）
	//2）点选（选中的内容放入输入框，隐藏ul）
	//3）ctrl+点击多选不隐藏ul
	//4）按方向键可以选择，回车选中（不隐藏ul）
	//5）ctrl+回车多选
	//6）按方向上下键支持循环选中


	//------------------------------------------------


	//声明变量
	var text = d.getElementById('text')
	var list = d.getElementById('list');
	var onOff = false;
	var a = d.getElementsByTagName('a');
	var ctrl = false;
	var n = 0; 
	//------------------------------------------------


	//函数初始化

	//------------------------------------------------


	//需求1:input聚焦,ul显示
	text.onfocus = function(){
		show();
		text.placeholder = '';
		onOff = true;
	}
	text.onblur = function(){
		if (onOff==false) {
			hidden();
			text.placeholder = '书中自有黄金屋，书中自有颜如玉'
		}
	}
	function show(){
		mTween(list,{height:320},1500,'bounceOut')
	}
	function hidden(){
		mTween(list,{height:0},1500,'bounceOut');
		text.blur();
		onOff = false;
	}


	//------------------------------------------------


	// 需求2:点选
	for (var i = 0; i < a.length; i++) {
		a[i].index = i;
	}
	list.addEventListener('mousedown', click);
	function click(ev){
		if (ev.ctrlKey) { // 需求3:ctrl+点击多选不隐藏ul
			if (text.value.indexOf(ev.target.innerHTML)==-1) {
				text.value += ev.target.innerHTML;
				ev.target.style.background = '#123555'
				ev.target.style.color = '#E69B03';
				n = ev.target.index;
				console.log(n)
			} else {
				text.value = text.value.split(ev.target.innerHTML).join('')
				ev.target.style.background = ''
				ev.target.style.color = ''
				n = ev.target.index;
				if (text.value == '') {
					text.placeholder = '书中自有黄金屋，书中自有颜如玉'
					n = 0;
				}
			}
			ev.cancelBubble = true;
			onOff = true;
		}else {
			onOff = false;
			text.value = ev.target.innerHTML;
			for (var i = 0; i < a.length; i++) {
				a[i].style.background = '';
				a[i].style.color = '';
				ev.target.style.color = ''
			}
			n = ev.target.index;
			ev.target.style.background = '#123555'
			ev.target.style.color = '#E69B03'
		}
	}
	d.addEventListener('mousedown',clear);
	function clear(ev){
		onOff = false;
		hidden();
	}


	//------------------------------------------------


	// 需求4:按方向键可以选择，回车选中（不隐藏ul）
	// 需求5:按方向上下键支持循环选中
	d.addEventListener('keydown',fnKeyD)
	function fnKeyD(ev){
		if(onOff == true){
			if (ev.keyCode==40) {
				n++;
				if (n>a.length-1) {
					n = 0;
				}
				for (var i = 0; i < a.length; i++) {
					a[i].style.background = '';
					a[i].style.color = '';
				}
				a[n].style.background = '#005AAB';
				a[n].style.color = '#FFDE00';
			}
			if (ev.keyCode==38) {
				n--;
				if (n<0) {
					n = a.length-1;
				}
				for (var i = 0; i < a.length; i++) {
					a[i].style.background = '';
					a[i].style.color = '';
				}
				a[n].style.background = '#005AAB';
				a[n].style.color = '#FFDE00'
				
			}
			if (ev.keyCode==13) {
				if (!a[n].className) {
					a[n].className = 'active'
					text.value += a[n].innerHTML;
					hidden();
				} else {
					a[n].className = '';
					text.value = text.value.split(a[n].innerHTML).join('')
					if (text.value == '') {
						text.placeholder = '书中自有黄金屋，书中自有颜如玉'
						n = 0;
					}
				}
			}
			if(ev.keyCode==13&&ev.ctrlKey==true){
				onOff = true;
				if (!a[n].className) {
					a[n].className = 'active'
					text.value += a[n].innerHTML;
				} else {
					a[n].className = ''
					text.value = text.value.split(a[n].innerHTML).join('')
				}
			}
		} else {
			for (var i = 0; i < a.length; i++) {
				a[i].style.background = '';
				a[i].style.color = '';
			}
		}
	}
	// 需求6:按方向上下键支持循环选中
	// 忘了什么效果了...就没写 =.=
})(document)