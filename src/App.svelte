<script>
  import Router from "svelte-spa-router";
  import {link} from 'svelte-spa-router'

  import { routes } from "./routes";
  import { worlds, fill } from "./stores";
  async function fetchAsync() {
    let res = await fetch("https://albiziapp.reveries-project.fr/api/history");
    let data = await res.json();
    return data;
  }
</script>

<style>
 ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
li a:hover {
  background-color: #111;
} 

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
  <nav class="menu">
    <ul>
	 <li>
        <a use:link href="/">Home</a>
      </li>

      <li>
        <a use:link href="/Global">Global</a>
      </li>
      <li>
        <a use:link href="/test">About</a>
      </li>
    </ul>
  </nav>


  {#await fetchAsync() then value}


  <Router {routes} />
    <i hidden>{fill(value)}</i>
  {/await}
