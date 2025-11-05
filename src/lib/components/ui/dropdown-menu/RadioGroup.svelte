<script>
  import { setContext } from 'svelte';
  export let value;
  setContext('dropdown-radio', { get value(){ return value; }, setValue: (v)=> value=v });
</script>
<div><slot /></div>

