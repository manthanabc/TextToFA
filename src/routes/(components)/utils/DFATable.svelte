<script>
	import { Separator } from "$lib/components/ui/separator/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  
	import { FA_states as states } from '../../../store.js';  
</script>

<div>
		<!-- DFA TABLE -->
		<div class="m-0 mt-14 mb-5">
			<Card.Root class=" p-0 relative backdrop-blur bg-black/30 max-w-xl w-full shadow-[0px_0px_12px_1px_black] rounded-lg border-none" >
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
          <Table.Head class="w-[100px]">State</Table.Head>
          <Table.Head>Type</Table.Head>
          <Table.Head>Transitions</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
      {#each $states as state}
        <Table.Row>
          <Table.Cell class="font-medium">{ state.name }</Table.Cell>
          <Table.Cell>{ state.final ? "accept" : "-" }</Table.Cell>
          <Table.Cell>
            {#if state.children && state.children.length}
              {state.children.map(([child, con]) => `${con}→${child.name}`).join(', ')}
            {:else}-{/if}
          </Table.Cell>
        </Table.Row>
      {/each}
      </Table.Body>
      </Table.Root>	
      </ScrollArea>			
				</Card.Content>
			</Card.Root>
		</div>
</div>
