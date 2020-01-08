<script>
  import { derived } from "svelte/store";
  import { worlds } from "../stores";
  import {countDateFreq} from '../stores'
  let init = 30;
  $: freq = {
    labels: $worlds.userFreq.slice(0, init).map(x => x[0]),
    datasets: [
      { name: "values", values: $worlds.userFreq.slice(0, init).map(x => x[1]) }
    ]
  };
  let eventFreq = {
    labels: $worlds.eventFreq.map(x => x[0]),
    datasets: [{ name: "values", values: $worlds.eventFreq.map(x => x[1]) }]
  }
  let points=countDateFreq($worlds.eventsDate.map((x)=>x.getTime()),24*60*300,24*60*300)
  console.log(points)
  let dateFreq={
    labels: Object.values(points).map(()=>'1h'),
    datasets: [{ name: "values", values: Object.values(points) }]
  }
  let x={hideDots: 1}
  let y={xIsSeries:true}
  console.log(dateFreq)
  import Chart from "svelte-frappe-charts";
</script>

<style>
  h2 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 100;
  }
  input {
    vertical-align: middle;
  }
  label {
    display: inline-block;
    vertical-align: middle;
    font-size: 0.7em;
    font-weight: 300;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<h2>Events by users</h2>
<main>
  <input
    type="range"
    id="users"
    bind:value={init}
    min="0"
    max={$worlds.userFreq.length} />
  <label for="users">User visibles : {init}</label>
  <Chart data={freq} type="line" />
</main>
<h2>Events repartition</h2>
<main>
  <Chart data={eventFreq} type="bar" />
</main>
<h2>Events date</h2>
<main>{x}
  <Chart data={dateFreq} lineOptions={x} axisOptions={y}/>
</main>
