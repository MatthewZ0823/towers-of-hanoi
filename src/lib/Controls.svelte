<script lang="ts">
  import { plates, speed } from "./stores";

  export let onSolve = () => {};
  export let onCancelSolve = () => {};

  const increment = () => {
    let numPlates = 0;
    $plates.forEach((peg) => (numPlates += peg.length));
    numPlates++;

    plates.set([
      Array.from({ length: numPlates }, (_, i) => numPlates - i),
      [],
      [],
    ]);

    onCancelSolve();
  };

  const decrement = () => {
    let numPlates = 0;
    $plates.forEach((peg) => (numPlates += peg.length));
    numPlates--;

    plates.set([
      Array.from({ length: numPlates }, (_, i) => numPlates - i),
      [],
      [],
    ]);

    onCancelSolve();
  };
</script>

<div class="flex flex-row mt-4 mx-4">
  <button on:click={increment} class="btn-primary w-12 h-12 rounded-sm mx-1"
    >+</button
  >
  <button on:click={decrement} class="btn-primary w-12 h-12 rounded-sm mx-1"
    >-</button
  >
  <button on:click={onSolve} class="btn-primary px-6 h-12 rounded-sm mx-1"
    >Solve</button
  >
  <form class="mx-1 flex items-center bg-primary px-4 rounded-sm">
    <label>
      Delay Between Moves (ms):             
      <input class="p-1 mx-2" type="number" max={10000} min={10} bind:value={$speed} />
    </label>
  </form>
</div>
