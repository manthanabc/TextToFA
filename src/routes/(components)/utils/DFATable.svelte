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
                        <Card.Root class="relative w-full max-w-xl p-0 ts-panel ts-panel--floating">
                          <Card.Header class="pb-6">
                            <span class="absolute top-3 right-3 text-xl ts-text-subtle" >
                                <i class="mi mi-chevron-down"></i>
                            </span>

                            <Card.Title class="text-xl font-semibold ts-text-strong">DFA Table</Card.Title>
                          </Card.Header>
                          <Card.Content class="pt-0" style="max-height:400px; pointer-events: all">

                                            <ScrollArea style="max-height: 500px" class="h-72">
                                                        <Table.Root >
                                                          <Table.Header>
                                                            <Table.Row class="ts-text-subtle">
                                                              <Table.Head class="w-[100px] text-left">DFA State</Table.Head>
                                                              <Table.Head class="text-left">Type</Table.Head>
                                                              <Table.Head class="text-left">0</Table.Head>
                                                              <Table.Head class="text-right">1</Table.Head>
                                                            </Table.Row>
                                                          </Table.Header>
                                                          <Table.Body>
                                                        {#each $states as state}
                                                              <Table.Row class="ts-text-strong">
                                                                <Table.Cell class="font-medium">{ state.name }</Table.Cell>
                                                                <Table.Cell class="ts-text-subtle uppercase tracking-wide text-xs">{ (state.final)?"accept":"-" }</Table.Cell>
                                                                <Table.Cell class="ts-text-subtle">{ (state.children[1])?state.children[1][0].name:'-' }</Table.Cell>
                                                                <Table.Cell class="text-right ts-text-subtle">{ (state.children[0])?state.children[0][0].name:'-' }</Table.Cell>
                                                              </Table.Row>
                                                        {/each}
                                                          </Table.Body>
                                                        </Table.Root>
                                                        </ScrollArea>
				</Card.Content>
			</Card.Root>
		</div>
</div>
