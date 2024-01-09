<script lang="ts">
  import Plate from "./Plate.svelte";
  import { onMount } from "svelte";
  import { boundingWidth, boundingHeight } from "./constants";
  import { plates, selectedTowers } from "./stores";

  export let id: number;

  let boundingBoxEl: HTMLButtonElement;
  let basePlateEl: HTMLDivElement;
  let poleEl: HTMLDivElement;
  let plateHolderEl: HTMLDivElement;

  let handleClick = () => {
    $selectedTowers[id] = !$selectedTowers[id];
  };

  onMount(() => {
    boundingBoxEl.style.width = `${boundingWidth}px`;
    boundingBoxEl.style.height = `${boundingHeight}px`;
    boundingBoxEl.style.minWidth = `${boundingWidth}px`;
    boundingBoxEl.style.minHeight = `${boundingHeight}px`;

    basePlateEl.style.width = `${boundingWidth * 0.8}px`;
    basePlateEl.style.height = `${boundingHeight * 0.05}px`;
    basePlateEl.style.left = `${boundingWidth * 0.1}px`;
    basePlateEl.style.bottom = `15px`;

    poleEl.style.width = `${boundingWidth * 0.05}px`;
    poleEl.style.height = `${boundingHeight * 0.85}px`;
    poleEl.style.left = `${boundingWidth * 0.475}px`;
    poleEl.style.bottom = `15px`;

    plateHolderEl.style.width = `${boundingWidth}px`;
    plateHolderEl.style.height = `${boundingHeight * 0.95 - 15}px`;
    plateHolderEl.style.bottom = `${boundingHeight * 0.05 + 15}px`;
  });
</script>

<button
  on:click={handleClick}
  bind:this={boundingBoxEl}
  class:selected={$selectedTowers[id]}
  class:unselected={!$selectedTowers[id]}
  class="bg-slate-200 m-4 rounded-md relative bounding-box"
>
  <div bind:this={poleEl} class="absolute bg-slate-400 rounded-sm" />
  <div bind:this={basePlateEl} class="absolute bg-slate-800 rounded-sm" />
  <div
    bind:this={plateHolderEl}
    class="absolute flex flex-col-reverse items-center"
  >
    {#each $plates[id] as plate}
      <Plate plateNum={plate} />
    {/each}
  </div>
</button>

<style>
  .unselected {
    @apply bg-slate-200;
  }

  .selected {
    @apply bg-red-500;
  }
</style>
