<script>
	import { onMount } from 'svelte';

	let embedController;
	const spotifyUri = Math.random() > 0.5 
		? 'spotify:artist:06HL4z0CvFAxyc27GXpf02'
		: 'spotify:track:1tuNqJOtRQVHvONR8Lg3MZ';

	const createSpotifyController = (IFrameAPI) => {
		const element = document.getElementById('embed-iframe');
		const options = {
			height: '80px',
			uri: spotifyUri
		};

		IFrameAPI.createController(element, options, (controller) => {
			embedController = controller;
			embedController.iframeElement.height = options.height;
			console.log(embedController);
		});
	};

	onMount(async () => {
			window.onSpotifyIframeApiReady = createSpotifyController;
	});
</script>

<div>
		<script src="https://open.spotify.com/embed/iframe-api/v1" async></script>
</div>
