<script lang="ts">
  import Controls from "./lib/Controls.svelte";
  import Tower from "./lib/Tower.svelte";
  import { plates, selectedTowers, solving, speed } from "./lib/stores";

  let source = -1;
  let interval: any;

  /**
   * Moves the top plate of one peg to another
   * @param source Peg to steal the top plate from
   * @param destination Peg to place the peg on
   */
  const movePlate = (source: number, destination: number) => {
    const newPlates = $plates;
    const removedPlate = newPlates[source].at(-1);
    let destinationPlate = $plates[destination].at(-1);

    if (destinationPlate === undefined) destinationPlate = 10000;

    if (removedPlate !== undefined && removedPlate < destinationPlate) {
      newPlates[source].pop();
      newPlates[destination].push(removedPlate);
    }

    plates.set(newPlates);
  };

  const solve = () => {
    // First reset the tower
    let numPlates = 0;
    $plates.forEach((peg) => (numPlates += peg.length));

    plates.set([
      Array.from({ length: numPlates }, (_, i) => numPlates - i),
      [],
      [],
    ]);

    // Put the solution in an array
    const solution: { (): void }[] = [];
    const recursiveSolve = (
      n: number,
      from: number,
      to: number,
      buffer: number
    ) => {
      if (n === 0) return;

      recursiveSolve(n - 1, from, buffer, to);
      solution.push(() => {
        movePlate(from, to);
      });
      recursiveSolve(n - 1, buffer, to, from);
    };

    recursiveSolve(numPlates, 0, 2, 1);

    // Run each step of the function
    let i = 0;
    solving.set(true);
    interval = setInterval(() => {
      if (i >= solution.length) cancelSolution();
      solution[i]();
      i++;
    }, $speed);
  };

  const cancelSolution = () => {
    console.log('cancelled')
    clearInterval(interval);
    solving.set(false);
  };

  $: if ($selectedTowers.includes(true)) {
    if (source === -1) {
      source = $selectedTowers.indexOf(true);
    } else {
      let destination: number;

      if (source === $selectedTowers.indexOf(true)) {
        destination = $selectedTowers.lastIndexOf(true);
      } else {
        destination = $selectedTowers.indexOf(true);
      }

      movePlate(source, destination);

      source = -1;
      selectedTowers.set([false, false, false]);
    }
  }
</script>

<h1 class="p-5 bg-slate-300 text-2xl text-black font-bold">Towers of Hanoi</h1>
<div class="flex flex-col items-center">
  <Controls onSolve={solve} onCancelSolve={cancelSolution} />

  <div class="flex flex-row">
    <Tower id={0} />
    <Tower id={1} />
    <Tower id={2} />
  </div>
</div>
