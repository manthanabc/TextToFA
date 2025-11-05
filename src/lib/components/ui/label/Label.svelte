<script>
  export let className = '';
  // Accept arbitrary props like `for` via rest props
  export let $$restProps;
</script>

<label class={className} {...$$restProps}>
  <slot />
</label>
