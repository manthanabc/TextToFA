<script lang="ts">
  import { theme } from "../../../store.js";

  import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";
  import Play from "lucide-svelte/icons/play";
  import Pause from "lucide-svelte/icons/pause";
  import Ch from "lucide-svelte/icons/rotate-ccw";

  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

  import EditorMenuBar from "../utils/MenuBar.svelte";
  import { TAYLOR_THEMES } from "$lib/themes";

  let running = true;
</script>

<div>
	<EditorMenuBar />
	
        <div class="absolute top-12 left-0 flex w-full flex-wrap items-center gap-2">

                <!-- MODE -->
                <Tabs.Root value="account" class="m-2">
                  <Tabs.List class="ts-tablist">
                    <Tabs.Trigger class="ts-tab-trigger" value="account">NFA</Tabs.Trigger>
                    <Tabs.Trigger class="ts-tab-trigger" value="p">DFA</Tabs.Trigger>
                  </Tabs.List>
                </Tabs.Root>
                <Tabs.Root value="account" class="m-2">
                  <Tabs.List class="ts-tablist">
                    <Tabs.Trigger class="ts-tab-trigger" value="account">Edit</Tabs.Trigger>
                    <Tabs.Trigger class="ts-tab-trigger" value="p">View</Tabs.Trigger>
                  </Tabs.List>
                </Tabs.Root>

                <!-- THEME -->
                <div class="m-2">
                        <DropdownMenu.Root>
                          <DropdownMenu.Trigger asChild let:builder>
                            <Button class="ts-button text-sm font-medium tracking-wide flex items-center gap-2" builders={[builder]} variant="ghost">
                              Themes
                              <ChevronsUpDown class="h-4 w-4 shrink-0 opacity-60"/>
                            </Button>
                          </DropdownMenu.Trigger>
                          <DropdownMenu.Content class="ts-dropdown p-2 space-y-1" align="start">
                            <DropdownMenu.RadioGroup bind:value={$theme}>
                              {#each TAYLOR_THEMES as option}
                                <DropdownMenu.RadioItem
                                  class="ts-dropdown__item flex items-center gap-3 rounded-xl px-3 py-2"
                                  value={option.id}
                                >
                                  <span class="ts-theme-swatch" aria-hidden="true">
                                    {#each option.swatch as color}
                                      <span class="ts-theme-swatch__color" style={`background:${color}`}></span>
                                    {/each}
                                  </span>
                                  <span class="flex flex-col text-left">
                                    <span class="text-sm font-semibold leading-tight ts-text-strong">{option.name}</span>
                                    <span class="text-[11px] tracking-wide ts-text-subtle">{option.tagline}</span>
                                  </span>
                                </DropdownMenu.RadioItem>
                              {/each}
                            </DropdownMenu.RadioGroup>
                          </DropdownMenu.Content>
                        </DropdownMenu.Root>
                </div>

                <!-- RUN PAUSE MENU -->
                <div class="m-2 flex items-center gap-1 rounded-full px-2 py-1 ts-surface ts-surface--compact">
                        <Button
                          class={`ts-button m-0 h-9 w-10 flex items-center justify-center ${running ? 'ts-button--active' : ''}`}
                          on:click={() => { running = !running; }}
                          variant="ghost"
                          size="sm"
                        >
                                <Play class="h-4 w-4 shrink-0"/>
                        </Button>
                        <Button
                          class={`ts-button m-0 h-9 w-10 flex items-center justify-center ${!running ? 'ts-button--active' : ''}`}
                          on:click={() => { running = !running; }}
                          variant="ghost"
                          size="sm"
                        >
                          <Pause class="h-4 w-4 shrink-0"/>
                        </Button>
                        <Button class="ts-button m-0 h-9 w-10 flex items-center justify-center" size="sm" variant="ghost">
                          <Ch class="h-4 w-4 shrink-0"/>
                        </Button>
                </div>
        </div>
</div>
