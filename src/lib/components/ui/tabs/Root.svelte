<script>
  import { setContext } from 'svelte';
  export let value = '';
  function setValue(v){ value = v; }
  setContext('tabs', { get value(){ return value; }, setValue });
</script>
<div class="tabs-root"><slot /></div>

