import { writable, derived } from 'svelte/store'

let all = writable({})
let freq
let eventFreq

function fillStore(val) {
    let toStore = {}
    let usersStore=[]
    let json = val
    json=json.filter(filterScore)
    let users = json.map((x) => (x.username))
    let uniqueEvent = json.map((x) => (x.event))
    let eventDates = json.map((x) => new Date(x.date))
    let uniqUsers = [...new Set(users)]
    for(let user of uniqUsers){
        let userEvents=json.filter((ev)=>ev.username==user).map((x)=>{
            x.datetime=new Date(x.date)
            return x
        })
        usersStore.push({user:user,events:userEvents})
    }
    toStore.userEvents=usersStore
    toStore.events = json
    toStore.uniq = uniqUsers
    toStore.userFreq = Object.entries(arrayFreq(users)).sort((a, b) => b[1] - a[1])
    toStore.eventFreq = Object.entries(arrayFreq(uniqueEvent)).sort((a, b) => b[1] - a[1])
    toStore.eventsDate = eventDates
    all.set(toStore)
    eventFreq = derived(all, $all => {
        return { labels: $all.eventFreq.map(x => x[0]), datasets: [{ name: 'values', data: $all.eventFreq.map(x => x[1]) }] }
    })

    freq = derived(all, $all => {
        return { labels: $all.userFreq.map(x => x[0]), datasets: [{ name: 'values', data: $all.userFreq.map(x => x[1]) }] }
    })
}
let arrayFreq = function (array) {
    return array.reduce(function (acc, curr) {
        if (typeof acc[curr] == 'undefined') {
            acc[curr] = 1;
        } else {
            acc[curr] += 1;
        }

        return acc;
    }, {});
}

let filterScore=function(val,index,t){
    if(val.event!="updateScore") return true
    if(index==t.length-1) return true
    if(val.object && val.object[0].nbPoint==0 && val.object[1].nbPoint==0 ) return false
    if(val.userId==t[index+1].userId && t[index+1].event=="updateScore") return false
    return true
}

export const frequency = function (array) {
    return array.reduce(function (acc, curr) {
        if (typeof acc[curr] == 'undefined') {
            acc[curr] = 1;
        } else {
            acc[curr] += 1;
        }

        return acc;
    }, {});
}

export const countDateFreq = function (array, start, step) {
    let reducer = function (acc, current) {
        if (current - start < 0) { acc[start] = acc[start] ? acc[start] + 1 : 1 }
        else {
            while (current - start > 0) { start = start + step }
            acc[start] = 1
        }
        return acc
    }
    return array.reduce(reducer, {})
}
//console.log(users)
//console.log(uniqUser)
export const worlds = all
export const fill = fillStore
export const tabs = freq
export const events = eventFreq