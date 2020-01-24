<script>
  import { fly } from "svelte/transition";
  export let activity;
  let getObject = function(activity) {
    let res = {};
    let status = activity.object.map(x => x.statut);
    let statusFreq = Object.entries(arrayFreq(status));
    res.statusFreq = statusFreq;
    res.activity = activity.object;
    return res;
  };
  let arrayFreq = function(array) {
    return array.reduce(function(acc, curr) {
      if (typeof acc[curr] == "undefined") {
        acc[curr] = 1;
      } else {
        acc[curr] += 1;
      }

      return acc;
    }, {});
  };
  $: activityObject = getObject(activity);
  let show = false;
</script>

<style>
  div {
    font-size: small;
    word-break: keep-all;
    text-align: left;
    text-overflow: ellipsis;
  }
</style>
{#each activityObject.statusFreq as item}
  <div>
    <b>Activity {item[0]} : {item[1]}</b>
  </div>
{/each}

<button on:click={e => (show = !show)}>Voir Activité</button>
{#if show}
  {#each activityObject.activity as item}
    <div transition:fly={{ x: 50, duration: 300 }}>
      {item.intitule},{item.statut}
    </div>
  {/each}
{/if}
