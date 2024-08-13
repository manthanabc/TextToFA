<script>
  import HelpMenu from "../utils/HelpMenu.svelte"
  import DFATable from "../utils/DFATable.svelte"

</script>

<div class="absolute right-1 h-full flex flex-col justify-end pointer-events-none">

		<DFATable />
		<HelpMenu />

		
		<!-- iframe width="100%" style="z-index: 3" height="80" src="https://open.spotify.com/embed/episode/7makk4oTQel546B0PZlDM5?utm_source=oembed"></iframe -->
		<!-- SPOTIFY EMBED -->
		<div style="pointer-events: all; z-index:30;" class="mb-4">
			<div id="embed-iframe" > </div>
		</div>
</div>
