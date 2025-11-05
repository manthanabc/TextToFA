<script>
  export let className = '';
  export let disabled = false;
</script>

<button class={className} disabled={disabled}>
  <slot />
</button>

