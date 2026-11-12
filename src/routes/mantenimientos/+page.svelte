
<script lang="ts">
	type Mantenimiento = {
		id: number;
		vehiculo: string;
		fecha: string;
		descripcion: string;
		kilometraje: number;
		costo: number;
	};

	let mantenimientos = $state<Mantenimiento[]>([
		{
			id: 1,
			vehiculo: 'Toyota Corolla - ABC 1234',
			fecha: '2026-11-05',
			descripcion: 'Cambio de aceite y filtros',
			kilometraje: 35000,
			costo: 4500
		},
		{
			id: 2,
			vehiculo: 'Chevrolet Onix - SBA 4567',
			fecha: '2026-11-08',
			descripcion: 'Revisión de frenos',
			kilometraje: 48000,
			costo: 6200
		},
		{
			id: 3,
			vehiculo: 'Fiat Strada - SCB 7890',
			fecha: '2026-11-10',
			descripcion: 'Service general',
			kilometraje: 18000,
			costo: 8500
		}
	]);

	let mostrarFormulario = $state(false);

	let vehiculo = $state('');
	let fecha = $state('');
	let descripcion = $state('');
	let kilometraje = $state('');
	let costo = $state('');

	let totalGastos = $derived(
		mantenimientos.reduce((total, m) => total + m.costo, 0)
	);

	function registrarMantenimiento() {
		mantenimientos.push({
			id: Date.now(),
			vehiculo,
			fecha,
			descripcion,
			kilometraje: Number(kilometraje),
			costo: Number(costo)
		});

		vehiculo = '';
		fecha = '';
		descripcion = '';
		kilometraje = '';
		costo = '';

		mostrarFormulario = false;
	}
</script>

<section class="space-y-6">

	<div class="flex flex-wrap items-center justify-between gap-4">
		<div>
			<p class="text-xs font-semibold tracking-widest text-cyan-200">
				CONTROL VEHICULAR
			</p>
			<h1 class="mt-1 text-3xl font-bold">Mantenimientos</h1>
			<p class="mt-2 text-sm text-white/65">
				Historial y control de mantenimiento de la flota.
			</p>
		</div>

		<button
			onclick={() => (mostrarFormulario = true)}
			class="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-800 shadow-lg hover:bg-cyan-50"
		>
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
				${totalGastos.toLocaleString('es-UY')}
			</p>
		</div>

		<div class="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
			<p class="text-sm text-white/65">Vehículos con registros</p>
			<p class="mt-2 text-3xl font-bold">
				{new Set(mantenimientos.map((m) => m.vehiculo)).size}
			</p>
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
							<td class="px-3 py-4">{mantenimiento.fecha.split('-').reverse().join('/')}</td>
							<td class="px-3 py-4">{mantenimiento.descripcion}</td>
							<td class="px-3 py-4">
								{mantenimiento.kilometraje.toLocaleString('es-UY')} km
							</td>
							<td class="px-3 py-4 font-semibold text-emerald-200">
								${mantenimiento.costo.toLocaleString('es-UY')}
							</td>
						</tr>
					{:else}
						<tr>
							<td colspan="5" class="px-3 py-10 text-center text-white/60">
								No hay mantenimientos registrados.
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	{#if mostrarFormulario}
		<div class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
			<div class="my-auto w-full max-w-2xl rounded-3xl border border-white/20 bg-[#29366b] p-6 shadow-2xl">

				<div class="mb-6 flex items-center justify-between">
					<div>
						<h2 class="text-xl font-bold">Registrar mantenimiento</h2>
						<p class="mt-1 text-sm text-white/60">
							Ingresá los datos del mantenimiento realizado.
						</p>
					</div>

					<button
						onclick={() => (mostrarFormulario = false)}
						class="text-xl text-white/70 hover:text-white"
					>
						×
					</button>
				</div>

				<form
					onsubmit={(evento) => {
						evento.preventDefault();
						registrarMantenimiento();
					}}
					class="grid grid-cols-1 gap-4 sm:grid-cols-2"
				>
					<label class="space-y-2 text-sm text-white/80 sm:col-span-2">
						Vehículo
						<select
							bind:value={vehiculo}
							required
							class="w-full rounded-xl border border-white/20 bg-[#344477] px-4 py-3 text-white outline-none focus:border-cyan-300"
						>
							<option value="" disabled>Seleccionar vehículo</option>
							<option value="Toyota Corolla - ABC 1234">Toyota Corolla - ABC 1234</option>
							<option value="Chevrolet Onix - SBA 4567">Chevrolet Onix - SBA 4567</option>
							<option value="Fiat Strada - SCB 7890">Fiat Strada - SCB 7890</option>
						</select>
					</label>

					<label class="space-y-2 text-sm text-white/80">
						Fecha
						<input
							bind:value={fecha}
							type="date"
							required
							class="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none"
						/>
					</label>

					<label class="space-y-2 text-sm text-white/80">
						Kilometraje
						<input
							bind:value={kilometraje}
							type="number"
							min="0"
							required
							placeholder="Ej.: 35000"
							class="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none"
						/>
					</label>

					<label class="space-y-2 text-sm text-white/80 sm:col-span-2">
						Descripción del mantenimiento
						<input
							bind:value={descripcion}
							type="text"
							required
							placeholder="Ej.: Cambio de aceite y filtros"
							class="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none"
						/>
					</label>

					<label class="space-y-2 text-sm text-white/80">
						Costo ($)
						<input
							bind:value={costo}
							type="number"
							min="0"
							step="0.01"
							required
							placeholder="Ej.: 4500"
							class="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none"
						/>
					</label>

					<div class="mt-3 flex items-end justify-end gap-3 sm:col-span-2">
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
							Guardar mantenimiento
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}

</section>
