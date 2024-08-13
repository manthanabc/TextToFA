<script>
  import HelpMenu from "../utils/HelpMenu.svelte"
  import DFATable from "../utils/DFATable.svelte"

</script>

<div class="absolute right-1 h-full flex flex-col justify-end pointer-events-none">

		<DFATable />
		<HelpMenu />

		<!-- SPOTIFY EMBED -->
		<div style="pointer-events: all; z-index:30;" class="mb-4">
			<div id="embed-iframe" > </div>
		</div>
</div>
