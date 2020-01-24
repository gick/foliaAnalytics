<script>
  import { fly } from "svelte/transition";
  export let observation;
  let getObject = function(observation) {
    let res = {};
    res.confidence = observation.confidence;
    res.genus = observation.genus;
    res.specie = observation.specie;
    res.common = observation.common;
    res.latitude=observation.latitude
    res.longitude=observation.longitude
console.log(res)
return res;
  };
  $: observationObject = getObject(observation.object);
</script>

<style>
  div {
    font-size: small;
    word-break: keep-all;
    text-align: left;
    text-overflow: ellipsis;
  }
</style>

<div>Latitude : {observationObject.latitude}</div>

<div>Longitude : {observationObject.longitude}</div>

{#if observationObject.specie}
<div>Specie : {observationObject.specie}</div>
{/if}
{#if observationObject.genus}
<div>Genus : {observationObject.genus}</div>
{/if}
{#if observationObject.confidence}
<div>Confidence : {observationObject.confidence}</div>
{/if}
