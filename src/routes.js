import Home from './routes/Home.svelte'
import Global from './routes/Global.svelte'
import Individual from './routes/Individual.svelte'

import Test from './routes/Test.svelte'

export const routes = {
    // Exact path
    '/':Home,
    '/Global': Global,
    '/Individual':Individual,
    // Using named parameters, with last being optional
    '/test': Test,

    // Wildcard parameter
}