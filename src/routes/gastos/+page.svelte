
<script lang="ts">
	let gastos = [
		{ id: 1, fecha: '02/11/2026', vehiculo: 'Toyota Corolla', categoria: 'Combustible', descripcion: 'Carga de combustible', importe: 3200 },
		{ id: 2, fecha: '04/11/2026', vehiculo: 'Chevrolet Onix', categoria: 'Repuestos', descripcion: 'Filtros y lubricantes', importe: 2800 },
		{ id: 3, fecha: '08/11/2026', vehiculo: 'Fiat Strada', categoria: 'Peajes', descripcion: 'Peajes del mes', importe: 950 },
		{ id: 4, fecha: '10/11/2026', vehiculo: 'Toyota Corolla', categoria: 'Neumáticos', descripcion: 'Revisión de neumáticos', importe: 1500 }
	];

	let mostrarFormulario = $state(false);
	let filtroCategoria = $state('Todas');

	let gastosFiltrados = $derived(
		filtroCategoria === 'Todas'
			? gastos
			: gastos.filter((gasto) => gasto.categoria === filtroCategoria)
	);

	let totalGastos = $derived(
		gastos.reduce((total, gasto) => total + gasto.importe, 0)
	);
</script>

<section class="space-y-6">
	<div class="flex flex-wrap items-center justify-between gap-4">
		<div>
			<p class="text-xs font-semibold tracking-widest text-cyan-200">CONTROL FINANCIERO</p>
			<h1 class="mt-1 text-3xl font-bold">Gastos</h1>
			<p class="mt-2 text-sm text-white/65">Controlá los gastos asociados a cada vehículo.</p>
		</div>

		<button onclick={() => mostrarFormulario = true}
			class="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-800 shadow-lg hover:bg-cyan-50">
			+ Registrar gasto
		</button>
	</div>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
		<div class="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
			<p class="text-sm text-white/65">Total de gastos</p>
			<p class="mt-2 text-3xl font-bold">{gastos.length}</p>
		</div>
		<div class="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
			<p class="text-sm text-white/65">Importe acumulado</p>
			<p class="mt-2 text-3xl font-bold text-cyan-200">${totalGastos.toLocaleString('es-UY')}</p>
		</div>
		<div class="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
			<p class="text-sm text-white/65">Categorías utilizadas</p>
			<p class="mt-2 text-3xl font-bold">{new Set(gastos.map((g) => g.categoria)).size}</p>
		</div>
	</div>

	<div class="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-xl backdrop-blur-xl">
		<div class="mb-5 flex flex-wrap items-center justify-between gap-3">
			<h2 class="text-lg font-semibold">Registro de gastos</h2>

			<select bind:value={filtroCategoria}
				class="rounded-xl border border-white/20 bg-[#344477] px-4 py-2 text-sm text-white outline-none">
				<option value="Todas">Todas las categorías</option>
				<option value="Combustible">Combustible</option>
				<option value="Repuestos">Repuestos</option>
				<option value="Neumáticos">Neumáticos</option>
				<option value="Peajes">Peajes</option>
			</select>
		</div>

		<div class="overflow-x-auto">
			<table class="w-full min-w-[700px] text-left text-sm">
				<thead>
					<tr class="border-b border-white/20 text-xs uppercase tracking-wider text-white/50">
						<th class="px-3 py-4">Fecha</th>
						<th class="px-3 py-4">Vehículo</th>
						<th class="px-3 py-4">Categoría</th>
						<th class="px-3 py-4">Descripción</th>
						<th class="px-3 py-4">Importe</th>
					</tr>
				</thead>
				<tbody>
					{#each gastosFiltrados as gasto (gasto.id)}
						<tr class="border-b border-white/10 hover:bg-white/10">
							<td class="px-3 py-4">{gasto.fecha}</td>
							<td class="px-3 py-4 font-medium">{gasto.vehiculo}</td>
							<td class="px-3 py-4">
								<span class="rounded-full bg-cyan-300/15 px-3 py-1 text-xs text-cyan-100">{gasto.categoria}</span>
							</td>
							<td class="px-3 py-4">{gasto.descripcion}</td>
							<td class="px-3 py-4 font-semibold text-emerald-200">${gasto.importe.toLocaleString('es-UY')}</td>
						</tr>
					{:else}
						<tr>
							<td colspan="5" class="px-3 py-10 text-center text-white/60">No hay gastos en esta categoría.</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	{#if mostrarFormulario}
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
			<div class="w-full max-w-lg rounded-3xl border border-white/20 bg-[#29366b] p-6 shadow-2xl">
				<div class="mb-5 flex justify-between">
					<h2 class="text-xl font-bold">Registrar gasto</h2>
					<button onclick={() => mostrarFormulario = false} class="text-xl text-white/70">×</button>
				</div>
				<p class="mb-5 text-sm text-white/60">
					El formulario de registro se conectará al servidor en una etapa posterior.
				</p>
				<div class="flex justify-end">
					<button onclick={() => mostrarFormulario = false}
						class="rounded-xl border border-white/20 px-5 py-3 text-sm hover:bg-white/10">
						Cerrar
					</button>
				</div>
			</div>
		</div>
	{/if}
</section>
