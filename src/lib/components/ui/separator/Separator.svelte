<script>
  export let orientation = 'horizontal';
</script>

<div {...$$restProps} style={orientation==='vertical' ? 'width:1px;align-self:stretch' : 'height:1px;width:100%'}></div>
