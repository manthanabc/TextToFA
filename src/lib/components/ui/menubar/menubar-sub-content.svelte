<script>
	import { Menubar as MenubarPrimitive } from "bits-ui";
	import { cn, flyAndScale } from "$lib/utils.js";
	let className = undefined;
	export let transition = flyAndScale;
	export let transitionConfig = { x: -10, y: 0 };
	export { className as class };
</script>

<MenubarPrimitive.SubContent
	{transition}
	{transitionConfig}
	class={cn(
		"z-50 min-w-max rounded-md border bg-popover p-1 text-popover-foreground focus:outline-none",
		className
	)}
	{...$$restProps}
	on:focusout
	on:pointermove
	on:keydown
>
	<slot />
</MenubarPrimitive.SubContent>
