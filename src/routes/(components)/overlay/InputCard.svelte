<script>
	import { input, reload } from '../../../store.js';  

	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
	import { Label } from "$lib/components/ui/label/index.js";


</script>

<div>
		<div class="absolute max-width-300 items-top flex-col bottom-1 p-4 backdrop-blur bg-black/30 max-w-xl w-full shadow-[0px_0px_50px_2px_black] m-4 rounded-lg">
			<Tabs.Root value="regex" class="w-full-[400px]">
			  <Tabs.List>
			    <Tabs.Trigger value="text">Text</Tabs.Trigger>
			    <Tabs.Trigger value="regex">Regex</Tabs.Trigger>
			  </Tabs.List>
			  <Tabs.Content value="text">
					<Textarea placeholder="Design a DFA to match 001 or 011 ocurring anywhere in the given string" class="backdrop-blur bg-black/10 resize-none border-none" />
			  </Tabs.Content>
			  <Tabs.Content value="regex">
					<Textarea placeholder="(001)|((10)|(aa)|(bc))" bind:value="{$input}" class="backdrop-blur bg-black/10 resize-none border-none" />
				</Tabs.Content>
			</Tabs.Root>
			<div class="flex items-center m-0 p-0">
				<Button class="hidden bg-black/30 backdrop-blur text-slate-400 bg-gradient-to-r from-purple-900 to-pink-900 rounded-lg shadow-[0px_0px_50px_2px_black] my-4 mr-2">
					Generate
				</Button>
				<Button class="bg-black/30 backdrop-blur text-slate-400 bg-gradient-to-r from-slate-800 to-slate-600 rounded-lg shadow-[0px_0px_50px_2px_black] my-4 mr-2">
					Generate
				</Button>
			  <Checkbox id="terms" class="m-2" bind:checked="{$reload}" />
				  <Label
				    for="terms"
				    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				  >
			    Auto Reload
			  </Label>				
			</div>
		</div>
</div>
