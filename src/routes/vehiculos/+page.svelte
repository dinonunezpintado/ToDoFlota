
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();

	let busqueda = $state('');
	let filtroEstado = $state('Todos');
	let mostrarFormulario = $state(false);

	let vehiculos = $derived(data.vehiculos);

	let vehiculosFiltrados = $derived(
		vehiculos.filter((vehiculo) => {
			const texto = busqueda.toLowerCase();

			const coincideBusqueda = [
				vehiculo.padron,
				vehiculo.matricula,
				vehiculo.marca,
				vehiculo.modelo
			].some((dato) => dato.toLowerCase().includes(texto));

			const coincideEstado =
				filtroEstado === 'Todos' || vehiculo.estado === filtroEstado;

			return coincideBusqueda && coincideEstado;
		})
	);

	let disponibles = $derived(
		vehiculos.filter((v) => v.estado === 'Disponible').length
	);

	let enMantenimiento = $derived(
		vehiculos.filter((v) => v.estado === 'En mantenimiento').length
	);
</script>

<section class="space-y-6">

	<!-- Título y botón -->
	<div class="flex flex-wrap items-center justify-between gap-4">
		<div>
			<p class="text-xs font-semibold tracking-widest text-cyan-200">
				ADMINISTRACIÓN
			</p>
			<h1 class="mt-1 text-3xl font-bold">Gestión de vehículos</h1>
			<p class="mt-2 text-sm text-white/65">
				Consultá y administrá los vehículos de tu flota.
			</p>
		</div>

		<button
			onclick={() => (mostrarFormulario = true)}
			class="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-cyan-50"
		>
			+ Agregar vehículo
		</button>
	</div>

	<!-- Mensajes del servidor -->
	{#if form?.mensaje}
		<div class="rounded-xl border border-white/20 bg-white/15 px-4 py-3 text-sm text-white backdrop-blur-lg">
			{form.mensaje}
		</div>
	{/if}

	{#if form?.exito}
		<div class="rounded-xl border border-emerald-300/30 bg-emerald-400/15 px-4 py-3 text-sm text-emerald-100">
			{form.mensaje}
		</div>
	{/if}

	<!-- Indicadores -->
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
		<div class="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-lg backdrop-blur-xl">
			<p class="text-sm text-white/65">Total de vehículos</p>
			<p class="mt-2 text-3xl font-bold">{vehiculos.length}</p>
		</div>

		<div class="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-lg backdrop-blur-xl">
			<p class="text-sm text-white/65">Disponibles</p>
			<p class="mt-2 text-3xl font-bold text-emerald-300">{disponibles}</p>
		</div>

		<div class="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-lg backdrop-blur-xl">
			<p class="text-sm text-white/65">En mantenimiento</p>
			<p class="mt-2 text-3xl font-bold text-amber-300">{enMantenimiento}</p>
		</div>
	</div>

	<!-- Listado -->
	<div class="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-xl backdrop-blur-xl">

		<div class="mb-5 flex flex-wrap items-center justify-between gap-3">
			<div>
				<h2 class="text-lg font-semibold">Vehículos registrados</h2>
				<p class="mt-1 text-xs text-white/55">
					Mostrando {vehiculosFiltrados.length} de {vehiculos.length} vehículos
				</p>
			</div>

			<div class="flex flex-wrap gap-2">
				<input
					bind:value={busqueda}
					type="search"
					placeholder="Buscar vehículo..."
					class="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm text-white outline-none placeholder:text-white/50 focus:border-cyan-300 sm:w-56"
				/>

				<select
					bind:value={filtroEstado}
					class="rounded-xl border border-white/20 bg-[#344477] px-3 py-2 text-sm text-white outline-none"
				>
					<option value="Todos">Todos los estados</option>
					<option value="Disponible">Disponible</option>
					<option value="En mantenimiento">En mantenimiento</option>
					<option value="Baja temporal">Baja temporal</option>
					<option value="Baja definitiva">Baja definitiva</option>
				</select>
			</div>
		</div>

		<div class="overflow-x-auto">
			<table class="w-full min-w-[800px] text-left text-sm">
				<thead>
					<tr class="border-b border-white/20 text-xs uppercase tracking-wider text-white/50">
						<th class="px-3 py-4">Padrón</th>
						<th class="px-3 py-4">Matrícula</th>
						<th class="px-3 py-4">Vehículo</th>
						<th class="px-3 py-4">Año</th>
						<th class="px-3 py-4">Kilometraje</th>
						<th class="px-3 py-4">Estado</th>
					</tr>
				</thead>

				<tbody>
					{#each vehiculosFiltrados as vehiculo (vehiculo.id)}
						<tr class="border-b border-white/10 transition hover:bg-white/10">
							<td class="px-3 py-4 font-medium">{vehiculo.padron}</td>
							<td class="px-3 py-4">{vehiculo.matricula}</td>
							<td class="px-3 py-4">
								<div class="font-semibold">{vehiculo.marca} {vehiculo.modelo}</div>
							</td>
							<td class="px-3 py-4">{vehiculo.anio}</td>
							<td class="px-3 py-4">
								{vehiculo.kilometraje.toLocaleString('es-UY')} km
							</td>
							<td class="px-3 py-4">
								<span class={`rounded-full px-3 py-1 text-xs font-medium ${
									vehiculo.estado === 'Disponible'
										? 'bg-emerald-400/20 text-emerald-200'
										: vehiculo.estado === 'En mantenimiento'
											? 'bg-amber-400/20 text-amber-200'
											: 'bg-slate-300/20 text-slate-200'
								}`}>
									{vehiculo.estado}
								</span>
							</td>
						</tr>
					{:else}
						<tr>
							<td colspan="6" class="px-3 py-12 text-center text-white/60">
								No se encontraron vehículos.
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<!-- Formulario de registro -->
	{#if mostrarFormulario}
		<div class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
			<div class="my-auto w-full max-w-2xl rounded-3xl border border-white/20 bg-[#29366b] p-6 shadow-2xl">

				<div class="mb-6 flex items-center justify-between">
					<div>
						<h2 class="text-xl font-bold">Registrar vehículo</h2>
						<p class="mt-1 text-sm text-white/60">
							Completá los datos del vehículo.
						</p>
					</div>

					<button
						onclick={() => (mostrarFormulario = false)}
						aria-label="Cerrar formulario"
						class="rounded-lg px-3 py-2 text-xl text-white/70 hover:bg-white/10"
					>
						×
					</button>
				</div>

				{#if form?.mensaje && !form?.exito}
					<div class="mb-4 rounded-xl border border-red-300/30 bg-red-400/15 px-4 py-3 text-sm text-red-100">
						{form.mensaje}
					</div>
				{/if}

				<form
					method="POST"
					use:enhance={() => {
						return async ({ result, update }) => {
							await update();

							if (result.type === 'success') {
								mostrarFormulario = false;
							}
						};
					}}
					class="grid grid-cols-1 gap-4 sm:grid-cols-2"
				>
					<label class="space-y-2 text-sm text-white/80">
						Padrón
						<input
							name="padron"
							type="text"
							required
							class="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none focus:border-cyan-300"
						/>
					</label>

					<label class="space-y-2 text-sm text-white/80">
						Matrícula
						<input
							name="matricula"
							type="text"
							required
							class="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none focus:border-cyan-300"
						/>
					</label>

					<label class="space-y-2 text-sm text-white/80">
						Marca
						<input
							name="marca"
							type="text"
							required
							class="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none focus:border-cyan-300"
						/>
					</label>

					<label class="space-y-2 text-sm text-white/80">
						Modelo
						<input
							name="modelo"
							type="text"
							required
							class="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none focus:border-cyan-300"
						/>
					</label>

					<label class="space-y-2 text-sm text-white/80">
						Año
						<input
							name="anio"
							type="number"
							min="1900"
							max="2100"
							required
							class="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none focus:border-cyan-300"
						/>
					</label>

					<label class="space-y-2 text-sm text-white/80">
						Kilometraje
						<input
							name="kilometraje"
							type="number"
							min="0"
							value="0"
							class="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none focus:border-cyan-300"
						/>
					</label>

					<div class="mt-3 flex justify-end gap-3 sm:col-span-2">
						<button
							type="button"
							onclick={() => (mostrarFormulario = false)}
							class="rounded-xl border border-white/20 px-5 py-3 text-sm hover:bg-white/10"
						>
							Cancelar
						</button>

						<button
							type="submit"
							class="rounded-xl bg-gradient-to-r from-violet-400 to-cyan-400 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:opacity-90"
						>
							Guardar vehículo
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}

</section>
