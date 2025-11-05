<script>
  import { getContext } from 'svelte';
  export let value = '';
  const tabs = getContext('tabs') || { value: undefined };
</script>
{#if !tabs.value || tabs.value === value}
  <div class="tabs-content"><slot /></div>
{/if}

