<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import { get } from "svelte/store";

  import { theme } from "../store.js";

  onMount(() => {
    const root = document.documentElement;

    const applyTheme = (value) => {
      const resolved = value ?? "lover";
      root.dataset.tsTheme = resolved;
    };

    applyTheme(get(theme));
    const unsubscribe = theme.subscribe(applyTheme);

    return () => {
      unsubscribe();
    };
  });
</script>

<slot></slot>
