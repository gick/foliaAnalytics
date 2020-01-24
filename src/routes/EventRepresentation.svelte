<script>
  import ScoreRepresentation from './ScoreRepresentation.svelte'
  import ActivityRepresentation from './ActivityRepresentation.svelte'
  import NewObservation from './NewObservation.svelte'
  let activityClass = new Map([
    [0, "classRel"],
    [1, "classGenre"],
    [2, "classVer"],
    [3, "classIden"],
    [4, "classMax"]
  ]);
  let activityText = new Map([
    [0, "Faire 3 relevés"],
    [1, "Faire 3 genres"],
    [2, "Vérifier 3 autres"],
    [3, "Identifier"],
    [4, "Faire maximum relevé"]
  ]);
  let getObject=function(event){
      let res
      if(event.event=='updateScore'){
          res=getScore(event)
      }
      if(event.event=='startActivity' || event.event=='endActivity'){
          res=event
          console.log(res)
      }
      if(event.event=='newObservation'){
          res=event
          console.log(res)
      }

      return res
  }
  let getScore=function(event){
      let result={}
      let explo=event.object[0]
      let knowledge=event.object[1]
      result.exploPoint=explo.nbPoint
      result.knowledgePoint=knowledge.nbPoint
      result.exploHistory=explo.history
      result.knowledgeHistory=knowledge.history
      return result
  }

  export let event;
  $: data = {
    class: event.activity
      ? activityClass.get(event.activity.index)
      : "classMax",
    text: event.event,
    object:getObject(event),
    activityText: event.activity ? activityText.get(event.activity.index) : "Indéfinie"
  };
</script>
<div class="content">
  <div class={'header ' + data.class}>{data.activityText}</div>

  <div>{data.text}</div>
  {#if data.text=='updateScore'}
  <ScoreRepresentation class='representation' score={data.object}></ScoreRepresentation>
  {/if}
  {#if data.text=='startActivity'}
  <ActivityRepresentation class='representation' activity={data.object}></ActivityRepresentation>
  {/if}
  {#if data.text=='endActivity'}
  <ActivityRepresentation class='representation' activity={data.object}></ActivityRepresentation>
  {/if}
  {#if data.text=='newObservation'}
  <NewObservation class='representation' observation={data.object}></NewObservation>
  {/if}

</div>

<style>
.representation {
word-break: keep-all;    
text-align: left;
}
  span {
    align-self: auto;
  }
  .header {
    width: 300px;
    height: 26px;
    position: relative;
    top: 0;
    text-align: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .content {
    width: 300px;
    border-radius: 10px;
    display: inline-flex;
    flex-direction: column;
    text-align: center;
    margin: 10px;
    margin-top: 0px;
   box-shadow: 14px 14px 18px -7px rgba(3,2,54,1);
  }
  .classRel {
    background-color: #040;
    color: white;
  }
  .classGenre {
    background-color: #171;
    color: gainsboro;
  }
  .classVer {
    background-color: #191;
    color: gray;
  }
  .classIden {
    background-color: #1c1;
    color: darkslategray;
  }
  .classMax {
    background-color: #9f9;
    color: black;
  }
</style>

