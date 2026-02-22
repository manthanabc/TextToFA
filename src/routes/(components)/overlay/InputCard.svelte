<script lang="ts">
  import { input, reload } from "../../../store.js";

  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
</script>

<div>
  <div class="absolute bottom-1 left-0 m-4 flex w-full max-w-xl flex-col gap-4 ts-panel ts-panel--floating">
    <Tabs.Root value="regex" class="w-full">
      <Tabs.List class="ts-tablist">
        <Tabs.Trigger class="ts-tab-trigger" value="text">Text</Tabs.Trigger>
        <Tabs.Trigger class="ts-tab-trigger" value="regex">Regex</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="text">
        <Textarea
          placeholder="(Coming soon) Describe the language you would like to recognise"
          class="ts-textarea resize-none"
        />
      </Tabs.Content>
      <Tabs.Content value="regex">
        <Textarea
          placeholder="(001)|((10)|(aa)|(bc))"
          bind:value={$input}
          class="ts-textarea resize-none"
        />
      </Tabs.Content>
    </Tabs.Root>
    <div class="flex w-full flex-wrap items-center justify-between gap-3">
      <Button class="ts-button px-6 py-2 text-sm font-semibold uppercase tracking-wide" variant="ghost">Generate</Button>
      <div class="flex items-center gap-2">
        <Checkbox id="terms" class="m-0" bind:checked={$reload} />
        <Label
          for="terms"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ts-text-subtle"
        >
          Auto Reload
        </Label>
      </div>
    </div>
  </div>
</div>
