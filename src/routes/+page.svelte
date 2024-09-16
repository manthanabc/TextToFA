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

<div class="h-full flex-col md:flex bg-gradient-to-tr from-[#111038] via-[#000712] to-[#351033]" style="background-image: linear-gradient(var(--angle), var(--tw-gradient-stops)) !important; animation: spin 5s ease infinite">
				<Overlay />

				<canvas id="DFA" style="background-image: none; background: #00000050" tabindex=0></canvas>

				<SpotifyEmbed />
				<Popup />
</div>
