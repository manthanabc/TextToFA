<script>
  export let className = '';
  export let forId = undefined;
</script>

<label class={className} for={forId}>
  <slot />
  </label>

