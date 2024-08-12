<script>
  import * as Card from "$lib/components/ui/card/index.js";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";

	import { FA_states as states } from '../../store.js';  
</script>

<!--          RIGHT HELP MENU            -->
<div class="absolute right-1 h-full flex flex-col justify-end pointer-events-none">

		<!-- DFA TABLE -->
		<div class="m-0 mt-14 mb-5">
			<Card.Root class=" p-0 relative backdrop-blur bg-black/30 max-w-xl w-full shadow-[0px_0px_50px_2px_black] rounded-lg border-none" >
			  <Card.Header>
			    <span class="absolute top-3 right-3" >
			    	<i class="mi mi-chevron-down"></i>
			    </span>

			    <Card.Title>DFA Table</Card.Title>
			  </Card.Header>
			  <Card.Content class="overflow-y-scrlloll" style="max-height:400px; pointer-events: all">

					    <ScrollArea style = " max-height: 500px" class="h-72 ">
							<Table.Root >
							  <Table.Header>
							    <Table.Row>
							      <Table.Head class="w-[100px]">DFA State</Table.Head>
							      <Table.Head>Type</Table.Head>
							      <Table.Head>0</Table.Head>
							      <Table.Head class="text-right">1</Table.Head>
							    </Table.Row>
							  </Table.Header>
							  <Table.Body>
							{#each $states as state}
							      <Table.Row>
							        <Table.Cell class="font-medium">{ state.name }</Table.Cell>
							        <Table.Cell>{ (state.final)?"accept":"-" }</Table.Cell>
							        <Table.Cell>{ (state.children[1])?state.children[1][0].name:'-' }</Table.Cell>
							        <Table.Cell class="text-right">{ (state.children[0])?state.children[0][0].name:'-' }</Table.Cell>
							      </Table.Row>
							{/each}		
							  </Table.Body>
							</Table.Root>	
							</ScrollArea>			
				</Card.Content>
			</Card.Root>
		</div>

		<!-- HELP MENU -->
		<div class="max-w-xl mb-4">
			<Card.Root class=" w-full backdrop-blur bg-black/30 shadow-[0px_0px_50px_2px_black] bottom-5 rounded-lg border-none">
			  <Card.Header>
			    <span class="absolute top-3 right-3">
			    	<i class="mi mi-chevron-down"></i>
			    </span>
			    <Card.Title class="inline">Shortcuts</Card.Title>
			  </Card.Header>
		    <Separator class="mb-2"/>
			  <Card.Content>
					<div class="flex justify-between p-0 m-0">
							        <span class="font-medium text-slate-300 pr-4">Shift + Click</span>
									    <Separator orientation="vertical" />
							        <span class="text-left text-slate-500 w-3/5">Add a new State</span>
					</div>
					<div class="flex justify-between p-0 m-0">
							        <span class="font-medium text-slate-300 pr-4">Alt + Click</span>
									    <Separator orientation="vertical" />
							        <span class="text-left text-slate-500 w-3/5">Add a transfomation</span>
					</div>
					<div class="flex justify-between p-0 m-0">
							        <span class="font-medium text-slate-300 pr-4">Alt + G</span>
									    <Separator orientation="vertical" />
							        <span class="text-left text-slate-500 w-3/5">Rearranges the nodes</span>
					</div>
					<div class="flex justify-between p-0 m-0">
							        <span class="font-medium text-slate-300 pr-4">Ctrl + Click</span>
									    <Separator orientation="vertical" />
							        <span class="text-left text-slate-500 w-3/5">Removes a State</span>
					</div>
					<div class="flex justify-between p-0 m-0">
							        <span class="font-medium text-slate-300 pr-4">Ctrl + F</span>
									    <Separator orientation="vertical" />
							        <span class="text-left text-slate-500 w-3/5">Toggle Fullscreen</span>
					</div>
					<div class="flex justify-between p-0 m-0">
							        <span class="font-medium text-slate-300 pr-4">Ctrl + R</span>
									    <Separator orientation="vertical" />
							        <span class="text-left text-slate-500 w-3/5">Reset View</span>
					</div>
				</Card.Content>

			  <Card.Footer>
			    <p class="text-slate-500">Press F1 to open documentation</p>
			  </Card.Footer>
			  </Card.Root>
		</div>

		<!-- SPOTIFY EMBED -->
		<div style="pointer-events: all; z-index:30;" class="mb-4">
			<div id="embed-iframe" > </div>
		</div>
</div>
