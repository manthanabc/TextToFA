<svelte:head>
		<link rel="stylesheet" href="https://unpkg.com/mono-icons@1.0.5/iconfont/icons.css" >
</svelte:head>


<script lang="ts">

	import { onMount } from 'svelte';
  import { input, reload } from '../store.js';
    
	import Overlay from './(components)/Overlay.svelte';	
	import Popup from './(components)/Popup.svelte'
	import SpotifyEmbed from './(components)/SpotifyEmbed.svelte'
	import engine from '../core/engine.js'

	let canvas ={}
	let goFullscreen = () => {}

 	let inputchanged = () => {}
 	let redraw = () => {}

  $: (() => {
     ($input);
     if(!($reload)) {return}
     engine.inputchanged($input)
  }) ()

	onMount(async () => {
		await engine.load();
  });

</script>

<div class="ts-app-surface flex flex-col items-stretch overflow-hidden">
                                <Overlay />

                                <canvas id="DFA" class="ts-canvas" tabindex="0"></canvas>

                                <SpotifyEmbed />
                                <Popup />
</div>
