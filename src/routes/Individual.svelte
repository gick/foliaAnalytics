<script>
    import UserList from './UserList.svelte'
    import EventTypes from './EventTypes.svelte'
    import UserEvents from './UserEvents.svelte'
    let user
    let value
    let selectUser=function(message){
        user=message.detail.label
        value=message.detail.value
    }
</script>
<UserList on:select={selectUser}></UserList>
{#if value}
<EventTypes data={value}></EventTypes>
<UserEvents data={user}></UserEvents>
{/if}