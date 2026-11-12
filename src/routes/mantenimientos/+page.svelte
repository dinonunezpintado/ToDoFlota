
<script lang="ts">
	let mantenimientos = [
		{ id: 1, vehiculo: 'Toyota Corolla - ABC 1234', fecha: '05/11/2026', descripcion: 'Cambio de aceite y filtros', kilometraje: 35000, costo: 4500 },
		{ id: 2, vehiculo: 'Chevrolet Onix - SBA 4567', fecha: '08/11/2026', descripcion: 'Revisión de frenos', kilometraje: 48000, costo: 6200 },
		{ id: 3, vehiculo: 'Fiat Strada - SCB 7890', fecha: '10/11/2026', descripcion: 'Service general', kilometraje: 18000, costo: 8500 }
	];

	let mostrarFormulario = $state(false);
</script>

<section class="space-y-6">
	<div class="flex flex-wrap items-center justify-between gap-4">
		<div>
			<p class="text-xs font-semibold tracking-widest text-cyan-200">CONTROL VEHICULAR</p>
			<h1 class="mt-1 text-3xl font-bold">Mantenimientos</h1>
			<p class="mt-2 text-sm text-white/65">Historial y control de mantenimiento de la flota.</p>
		</div>

		<button onclick={() => mostrarFormulario = true}
			class="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-800 shadow-lg hover:bg-cyan-50">
			+ Registrar mantenimiento
		</button>
	</div>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
		<div class="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
			<p class="text-sm text-white/65">Total de registros</p>
			<p class="mt-2 text-3xl font-bold">{mantenimientos.length}</p>
		</div>
		<div class="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
			<p class="text-sm text-white/65">Costo acumulado</p>
			<p class="mt-2 text-3xl font-bold text-cyan-200">
				${mantenimientos.reduce((total, m) => total + m.costo, 0).toLocaleString('es-UY')}
			</p>
		</div>
		<div class="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
			<p class="text-sm text-white/65">Último registro</p>
			<p class="mt-2 text-2xl font-bold">10/11/2026</p>
		</div>
	</div>

	<div class="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-xl backdrop-blur-xl">
		<h2 class="mb-5 text-lg font-semibold">Historial de mantenimientos</h2>

		<div class="overflow-x-auto">
			<table class="w-full min-w-[700px] text-left text-sm">
				<thead>
					<tr class="border-b border-white/20 text-xs uppercase tracking-wider text-white/50">
						<th class="px-3 py-4">Vehículo</th>
						<th class="px-3 py-4">Fecha</th>
						<th class="px-3 py-4">Descripción</th>
						<th class="px-3 py-4">Kilometraje</th>
						<th class="px-3 py-4">Costo</th>
					</tr>
				</thead>
				<tbody>
					{#each mantenimientos as mantenimiento (mantenimiento.id)}
						<tr class="border-b border-white/10 hover:bg-white/10">
							<td class="px-3 py-4 font-medium">{mantenimiento.vehiculo}</td>
							<td class="px-3 py-4">{mantenimiento.fecha}</td>
							<td class="px-3 py-4">{mantenimiento.descripcion}</td>
							<td class="px-3 py-4">{mantenimiento.kilometraje.toLocaleString('es-UY')} km</td>
							<td class="px-3 py-4 font-semibold text-emerald-200">${mantenimiento.costo.toLocaleString('es-UY')}</td>
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
					<h2 class="text-xl font-bold">Registrar mantenimiento</h2>
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
