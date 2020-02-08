<template>
  <div id="app">
  </div>
</template>

<script>
	import NeuralNet from '@/core/NeuralNet'

	export default {
		name: 'app',

		mounted() {
			console.clear()
      NeuralNet.main()
		}

	}
</script>
