<script>
  import { getContext } from 'svelte';
  export let value = '';
  const tabs = getContext('tabs') || { setValue: ()=>{} };
  function activate(){ tabs.setValue && tabs.setValue(value); }
</script>
<button on:click={activate}><slot /></button>

