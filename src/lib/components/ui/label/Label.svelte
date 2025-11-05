<script>
  // Use Svelte rest props to forward attributes like class and for
</script>

<label {...$$restProps}>
  <slot />
</label>
