<script>
  import { fly } from 'svelte/transition'
  export let score;
  let histo=false
</script>

<div>
  <b>Exploration : {score.exploPoint}</b>
</div>
<div>
  <b>Connaissance : {score.knowledgePoint}</b>
</div>
<button on:click={e=>histo=!histo}>Voir historique</button>
{#if histo}
{#each score.exploHistory as item}
  <div transition:fly="{{ x: 50, duration: 300 }}">{item.text}</div>
{/each}
{#each score.knowledgeHistory as item}
  <div>{item.text}</div>
{/each}
{/if}
<style>
div{
font-size: small;
word-break: keep-all;    
text-align: left;
text-overflow: ellipsis;
}
</style>