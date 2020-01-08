import Home from './routes/Home.svelte'
import Global from './routes/Global.svelte'

import Test from './routes/Test.svelte'

export const routes = {
    // Exact path
    '/':Home,
    '/Global': Global,

    // Using named parameters, with last being optional
    '/test': Test,

    // Wildcard parameter
}