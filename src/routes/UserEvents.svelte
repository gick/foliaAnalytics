<script>
  import Chart from "svelte-frappe-charts";
  import { countDateFreq } from "../stores";
  import { worlds } from "../stores";
  import EventRepresentation from "./EventRepresentation.svelte";
  export let data;
  let isNavigable = true;
  let eventPartition = [];
  let eventToShow = [];
  let timeChart;
  let getEvent = function(user) {
    timeline = false;
    let array = $worlds.userEvents
      .filter(x => x.user == user)
      .map(y => y.events)[0];
    eventPartition = [];
    eventToShow = [];
    let uniqueDates = array.map(x => x.datetime);
    let points = countDateFreq(
      uniqueDates.map(z => z.getTime()),
      24 * 60 * 60 * 500,
      24 * 60 * 60 * 500
    );
    let start = 0;
    for (let part of Object.values(points)) {
      eventPartition.push(array.slice(start, start + part));
      start += part;
    }
    timeline = true;
    let result = {
      labels: Object.keys(points).map(x =>
        new Date(Number.parseInt(x)).toDateString()
      ),
      datasets: [{ name: "values", values: Object.values(points) }]
    };
    return result;
  };
  $: lineData = getEvent(data);
  let timeline = false;
  let handleSelect = function(event) {
    console.log(event.target)
    if(event.target.dataset && event.target.dataset.pointIndex)
    eventToShow = eventPartition[event.target.dataset.pointIndex];
  };
</script>
<div on:click={handleSelect}>
<Chart  data={lineData} bind:this={timeChart} type="bar" />
</div>{#each eventToShow as item}
  <EventRepresentation event={item} />
{/each}
