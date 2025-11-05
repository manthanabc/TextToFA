<script>
  import { getContext } from 'svelte';
  export let value = '';
  const group = getContext('dropdown-radio') || { setValue: ()=>{} };
  function select(){ group.setValue && group.setValue(value); }
</script>
<div role="radio" on:click={select} {...$$restProps}><slot /></div>
