
<script lang="ts">
	import './layout.css';
	import type { LayoutProps } from './$types';
	import { page } from '$app/state';

	let { children }: LayoutProps = $props();

	const opcionesMenu = [
		{ nombre: 'Dashboard', icono: '📊', ruta: '/' },
		{ nombre: 'Vehículos', icono: '🚗', ruta: '/vehiculos' },
		{ nombre: 'Mantenimientos', icono: '⚙', ruta: '/mantenimientos' },
		{ nombre: 'Gastos', icono: '💲', ruta: '/gastos' }
	];
</script>

<svelte:head>
	<title>ToDoFlota | Gestión de flotas</title>
	<meta
		name="description"
		content="Sistema de gestión y control integral de flotas vehiculares"
	/>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-[#34245f] via-[#263b78] to-[#087d9c] p-3 text-white md:p-6">
	<div class="mx-auto flex min-h-[calc(100vh-3rem)] max-w-[1700px] gap-5">

		<!-- Menú lateral -->
		<aside class="hidden w-64 shrink-0 flex-col rounded-3xl border border-white/20 bg-white/10 p-5 shadow-xl backdrop-blur-xl md:flex">

			<div class="mb-12 flex items-center gap-3 px-2 pt-3">
				<div class="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-400 to-cyan-400 text-2xl font-bold shadow-lg">
					T
				</div>

				<div>
					<h1 class="text-xl font-bold tracking-wide">ToDoFlota</h1>
					<p class="text-xs text-white/60">Gestión de flotas</p>
				</div>
			</div>

			<p class="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-white/50">
				Menú principal
			</p>

			<nav class="flex flex-col gap-2">
				{#each opcionesMenu as opcion}
					<a
						href={opcion.ruta}
						aria-current={page.url.pathname === opcion.ruta ? 'page' : undefined}
						class={`flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 ${
							page.url.pathname === opcion.ruta
								? 'border border-white/20 bg-white/20 shadow-lg text-white'
								: 'text-white/70 hover:bg-white/10 hover:text-white'
						}`}
					>
						<span class="w-6 text-center text-lg">{opcion.icono}</span>
						<span class="text-sm font-medium">{opcion.nombre}</span>
					</a>
				{/each}
			</nav>

			<div class="mt-auto rounded-2xl border border-white/15 bg-white/10 p-4">
				<div class="mb-2 flex items-center gap-2">
					<span class="h-2 w-2 rounded-full bg-emerald-400"></span>
					<span class="text-xs font-medium text-white/80">Sistema en desarrollo</span>
				</div>

				<p class="text-xs leading-relaxed text-white/50">
					ToDoFlota · Panel de gestión vehicular
				</p>
			</div>
		</aside>

		<!-- Área principal -->
		<div class="min-w-0 flex-1">

			<!-- Encabezado superior -->
			<header class="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/20 bg-white/10 px-5 py-5 shadow-lg backdrop-blur-xl md:px-8">

				<div>
					<h2 class="text-xl font-semibold md:text-2xl">
						Bienvenido a ToDoFlota
					</h2>

					<p class="mt-1 text-sm text-white/60">
						Controlá tu flota. Mantené todo bajo control.
					</p>
				</div>

				<div class="flex items-center gap-3">
					<div class="hidden items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 sm:flex">
						<span class="text-white/60">⌕</span>

						<input
							type="search"
							placeholder="Buscar..."
							class="w-32 bg-transparent text-sm text-white outline-none placeholder:text-white/50"
						/>
					</div>

					<button
						aria-label="Notificaciones"
						class="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-lg transition hover:bg-white/20"
					>
						♧
					</button>

					<div class="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-gradient-to-br from-violet-400 to-cyan-400 font-bold shadow-lg">
						T
					</div>
				</div>
			</header>

			<!-- Contenido de las páginas -->
			<main>
				{@render children()}
			</main>

			<footer class="py-6 text-center text-xs text-white/40">
				ToDoFlota © 2026 · Sistema de gestión vehicular
			</footer>
		</div>
	</div>
</div>
