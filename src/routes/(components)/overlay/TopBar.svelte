<script>
	import { theme } from "../../../store.js"
	
  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  import Play from "lucide-svelte/icons/play";
  import Pause from "lucide-svelte/icons/pause";
  import Ch from "lucide-svelte/icons/rotate-ccw";
	
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

  import EditorMenuBar from "../utils/MenuBar.svelte"
  
	let running = true
</script>

<div>
	<EditorMenuBar />
	
	<div class="absolute top-12 left-0 flex flex-cols w-full absolute">

		<!-- MODE -->
		<Tabs.Root value="account" class="m-2 shadow-[0px_0px_12px_1px_black]">
		  <Tabs.List style="background-color: #404040f0; backdrop-filter: blur(50px)">
		    <Tabs.Trigger value="account">NFA</Tabs.Trigger>
		    <Tabs.Trigger value="p">DFA</Tabs.Trigger>
		  </Tabs.List>
		</Tabs.Root>
		<Tabs.Root value="account" class="m-2 shadow-[0px_0px_12px_1px_black]">
		  <Tabs.List style="background-color: #40404040; backdrop-filter: blur(50px)">
		    <Tabs.Trigger value="account">Edit</Tabs.Trigger>
		    <Tabs.Trigger value="p">View</Tabs.Trigger>
		  </Tabs.List>
		</Tabs.Root>

		<!-- THEME -->
		<div class="m-2 shadow-[0px_0px_12px_1px_black]">
			<DropdownMenu.Root class="bg-white">
			  <DropdownMenu.Trigger asChild let:builder>
			    <Button style="background-color: #40404040; backdrop-filter: blur(50px)" class="text-slate-300" builders={[builder]}>Themes <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50"/></Button>
			  </DropdownMenu.Trigger>
			  <DropdownMenu.Content>
			    <DropdownMenu.RadioGroup bind:value={$theme}>
			      <DropdownMenu.RadioItem value="monochrome">monochrome</DropdownMenu.RadioItem>
			      <DropdownMenu.RadioItem value="red">red</DropdownMenu.RadioItem>
			      <DropdownMenu.RadioItem value="fade">fade</DropdownMenu.RadioItem>
			      <DropdownMenu.RadioItem value="bubblegum">Gum</DropdownMenu.RadioItem>
			    </DropdownMenu.RadioGroup>
			  </DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>

		<!-- RUN PAUSE MENU -->
		<div class="m-2 flex rounded-md shadow-[0px_0px_12px_1px_black]" style="background-color: #40404040; backdrop-filter: blur(50px)">
			<Button class="m-1 h-8 mr-0 hover:bg-sky-700  w-10 bg-{running? 'sky-700': 'transparent'}" on:click={() => { running=!running;} } variant="secondary" size="sm">
				<Play class="h-4 w-4 shrink-0 opacity-80"/>
			</Button>
			<Button class="hover:bg-sky-700 bg-{!running? 'sky-700': 'transparent'} m-1 ml-0 mr-1 h-8 w-10 text-slate-300" on:click={() => { running=!running;  } } variant="secondary" size="sm"><Pause class="h-4 w-4 shrink-0 opacity-80"/></Button>
			<Button class="bg-transparent  m-1 ml-0 mr-1 h-8 w-10 text-slate-300" size="sm"><Ch class="h-4 w-4 shrink-0 opacity-80"/></Button>
		</div>
	</div>
</div>
