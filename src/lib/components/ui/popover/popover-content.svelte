<script>
	import { Popover as PopoverPrimitive } from "bits-ui";
	import { cn, flyAndScale } from "$lib/utils.js";
	let className = undefined;
	export let transition = flyAndScale;
	export let transitionConfig = undefined;
	export { className as class };
</script>

<PopoverPrimitive.Content
	{transition}
	{transitionConfig}
	class={cn(
		"bg-popover text-popover-foreground z-50 w-72 rounded-md border p-4 shadow-md outline-none",
		className
	)}
	{...$$restProps}
>
	<slot />
</PopoverPrimitive.Content>
