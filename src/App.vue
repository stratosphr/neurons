<template>
  <div id="app">
    <div id="net" style="width: 95vw; height: 95vh; border: solid black thin; margin: auto">

    </div>
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
