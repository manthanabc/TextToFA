<script>
	import { Separator } from "$lib/components/ui/separator/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
</script>

<div>
		<!-- HELP MENU -->
                <div class="max-w-xl mb-4">
                        <Card.Root class="w-full ts-panel ts-panel--floating">
                          <Card.Header class="pb-6">
                            <span class="absolute top-3 right-3 text-xl ts-text-subtle">
                                <i class="mi mi-chevron-down"></i>
                            </span>
                            <Card.Title class="inline text-xl font-semibold ts-text-strong">Shortcuts</Card.Title>
                          </Card.Header>
                    <Separator class="mb-2"/>
                          <Card.Content class="space-y-2">
                                        <div class="flex justify-between p-0 m-0">
                                                                <span class="font-medium ts-text-strong pr-4">Shift + Click</span>
                                                                            <Separator orientation="vertical" />
                                                                <span class="text-left ts-text-subtle w-3/5">Add a new State</span>
                                        </div>
                                        <div class="flex justify-between p-0 m-0">
                                                                <span class="font-medium ts-text-strong pr-4">Alt + Click</span>
                                                                            <Separator orientation="vertical" />
                                                                <span class="text-left ts-text-subtle w-3/5">Add a transformation</span>
                                        </div>
                                        <div class="flex justify-between p-0 m-0">
                                                                <span class="font-medium ts-text-strong pr-4">Alt + G</span>
                                                                            <Separator orientation="vertical" />
                                                                <span class="text-left ts-text-subtle w-3/5">Rearranges the nodes</span>
                                        </div>
                                        <div class="flex justify-between p-0 m-0">
                                                                <span class="font-medium ts-text-strong pr-4">Ctrl + Click</span>
                                                                            <Separator orientation="vertical" />
                                                                <span class="text-left ts-text-subtle w-3/5">Removes a State</span>
                                        </div>
                                        <div class="flex justify-between p-0 m-0">
                                                                <span class="font-medium ts-text-strong pr-4">Ctrl + F</span>
                                                                            <Separator orientation="vertical" />
                                                                <span class="text-left ts-text-subtle w-3/5">Toggle Fullscreen</span>
                                        </div>
                                        <div class="flex justify-between p-0 m-0">
                                                                <span class="font-medium ts-text-strong pr-4">Ctrl + R</span>
                                                                            <Separator orientation="vertical" />
                                                                <span class="text-left ts-text-subtle w-3/5">Reset View</span>
                                        </div>
                                </Card.Content>

                          <Card.Footer>
                            <p class="ts-text-subtle">Press F1 to open documentation</p>
                          </Card.Footer>
                          </Card.Root>
                </div>
</div>
