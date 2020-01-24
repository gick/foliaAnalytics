<script>
    import Select from 'svelte-select'
    import {worlds} from '../stores'
    let items=$worlds.userEvents.map((x)=>{
        return {label:x.user,value:x.events}
    })
    console.log(items)
</script>
<Select on:select {items}></Select>
