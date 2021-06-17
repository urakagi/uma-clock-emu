<template>
  <div style="text-align: left;">
		<el-dropdown split-button @command="handleCommand">
			語言
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="ja">日文</el-dropdown-item>
				<el-dropdown-item command="zhTW">繁體中文</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
  </div>
</template>

<script>
	export default {
		methods: {
			handleCommand(command) {
				window.location.href = '/' + command
			}
		}
	}
</script>
