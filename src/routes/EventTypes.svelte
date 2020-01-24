<script>
  import Chart from "svelte-frappe-charts";
  import {frequency} from '../stores'
  export let data
  let getEvent=function(array){
       let uniqueEvent = array.map((x) => (x.event))
       let byFreq= Object.entries(frequency(uniqueEvent)).sort((a, b) => b[1] - a[1])
       return {labels:byFreq.map((x)=>x[0]),datasets:[{name:'values',values:byFreq.map((x)=>x[1])}]}
  }
  $: chartData = getEvent(data)

</script>
<Chart data={chartData} type="bar">
</Chart>