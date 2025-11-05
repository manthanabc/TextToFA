<script>
  import { createEventDispatcher } from 'svelte';
  export let className = '';
  export let id = undefined;
  export let checked = false;
  const dispatch = createEventDispatcher();
  function onChange(e){ checked = e.currentTarget.checked; dispatch('change',{checked}); }
</script>

<input id={id} class={className} type="checkbox" bind:checked on:change={onChange} />

