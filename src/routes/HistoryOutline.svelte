<script>
    import {worlds} from '../stores'
</script>

<main>
	<p>Events logged so far : {$worlds.events.length}</p>
    <p>Over {$worlds.uniq.length} users!</p>
</main>

<style>

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>