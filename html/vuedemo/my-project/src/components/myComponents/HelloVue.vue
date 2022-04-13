<template>
	<div id="vue">
		Hello Vue.js! {{message}}
	</div>
</template>

<script>
	//自定义组件
export default {
	name: 'HelloVue',
	data() {
		return {
			message: '吃饭'
		}
	}
}
</script>

<style type="text/css">
#vue {
	color: #42b983;
	font-size: 28px;
}
</style>