<script>
  import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
  
	let open = false;
</script>

<div>
		<!-- ALERT MENU -->
                <AlertDialog.Root bind:open>
                  <AlertDialog.Content class="ts-dialog-panel border-none">
                    <AlertDialog.Header>
                      <AlertDialog.Title class="text-2xl font-semibold ts-text-strong">Are you sure?</AlertDialog.Title>
                      <AlertDialog.Description class="ts-text-subtle">
                        This webapp is currently in development and lacks key features
                        stay tuned for updates and dont hesitate to buy me a coffee.
                      </AlertDialog.Description>
                    </AlertDialog.Header>
                    <AlertDialog.Footer>
                      <AlertDialog.Action class="ts-button px-6 py-2 text-sm font-semibold uppercase tracking-wide">Continue</AlertDialog.Action>
                    </AlertDialog.Footer>
                  </AlertDialog.Content>
                </AlertDialog.Root>
</div>
