<script>
  import { createEventDispatcher } from 'svelte';
  export let checked = false;
  const dispatch = createEventDispatcher();
  function onChange(e){ checked = e.currentTarget.checked; dispatch('change',{checked}); }
</script>

<input {...$$restProps} type="checkbox" bind:checked on:change={onChange} />
