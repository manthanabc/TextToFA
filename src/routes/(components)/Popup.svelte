<script>
  import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
  
	let open = false;
</script>

<div>
		<!-- ALERT MENU -->
		<AlertDialog.Root bind:open>
		  <AlertDialog.Content class="border-none shadow-2xl backdrop-blur bg-black/30 shadow-[0px_0px_50px_2px_black] rounded-lg">
		    <AlertDialog.Header>
		      <AlertDialog.Title>Are you sure?</AlertDialog.Title>
		      <AlertDialog.Description>
		        This webapp is currently in development and lacks key features
		        stay tuned for updates and dont hesitate to buy me a coffee.
		      </AlertDialog.Description>
		    </AlertDialog.Header>
		    <AlertDialog.Footer>
		      <AlertDialog.Action>Continue</AlertDialog.Action>
		    </AlertDialog.Footer>
		  </AlertDialog.Content>
		</AlertDialog.Root>
</div>
