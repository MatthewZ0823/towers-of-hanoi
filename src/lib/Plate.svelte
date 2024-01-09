<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { solving, speed } from "./stores";

  export let plateNum: number;
  let plateEl: HTMLDivElement;
  let duration: number;

  onMount(() => {
    plateEl.style.width = `${50 + plateNum * 15}px`;
  });

  $: if (plateEl) plateEl.style.width = `${50 + plateNum * 15}px`;
  $: duration = $solving && $speed <= 500 ? 0 : $speed / 5;
</script>

<div
  class="bg-orange-500 h-5 rounded-sm border-orange-800 border-2"
  transition:fly={{ y: -100, duration: duration }}
  bind:this={plateEl}
/>
