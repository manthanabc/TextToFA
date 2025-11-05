<script>
  export let disabled = false;
</script>

<button {...$$restProps} disabled={disabled}>
  <slot />
  </button>
