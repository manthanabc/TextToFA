<script>
  export let className = '';
  export let style = '';
</script>

<div class={className} style={`overflow:auto; ${style}`}>
  <slot />
</div>

