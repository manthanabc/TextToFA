<script>
  export let open = false;
</script>
{#if open}
  <div {...$$restProps}><slot /></div>
{/if}
