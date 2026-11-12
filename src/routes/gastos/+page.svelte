
<script lang="ts">
	type Gasto = {
		id: number;
		vehiculo: string;
		fecha: string;
		categoria: string;
		descripcion: string;
		importe: number;
	};

	let gastos = $state<Gasto[]>([
		{
			id: 1,
			vehiculo: 'Toyota Corolla - ABC 1234',
			fecha: '2026-11-03',
			categoria: 'Combustibles',
			descripcion: 'Carga de combustible',
			importe: 2500
		},
		{
			id: 2,
			vehiculo: 'Chevrolet Onix - SBA 4567',
			fecha: '2026-11-06',
			categoria: 'Peajes',
			descripcion: 'Peajes del viaje a Rivera',
			importe: 450
		},
		{
			id: 3,
			vehiculo: 'Fiat Strada - SCB 7890',
			fecha: '2026-11-09',
			categoria: 'Repuestos',
			descripcion: 'Compra de filtros',
			importe: 1800
		}
	]);

	let mostrarFormulario = $state(false);

	let vehiculo = $state('');
	let fecha = $state('');
	let categoria = $state('');
	let descripcion = $state('');
	let importe = $state('');

	const categorias = [
		'Combustibles',
		'Repuestos',
		'Neumáticos',
		'Peajes',
		'Lubricantes',
		'Reparaciones',
		'Lavados',
		'Otros'
	];

	let totalGastos = $derived(
		gastos.reduce((total, gasto) => total + gasto.importe, 0)
	);

	function registrarGasto() {
		gastos.push({
			id: Date.now(),
			vehiculo,
			fecha,
			categoria,
			descripcion,
			importe: Number(importe)
		});

		vehiculo = '';
		fecha = '';
		categoria = '';
		descripcion = '';
		importe = '';

		mostrarFormulario = false;
	}
</script>

<section class="space-y-6">

	<div class="flex flex-wrap items-center justify-between gap-4">
		<div>
			<p class="text-xs font-semibold tracking-widest text-cyan-200">
				CONTROL FINANCIERO
			</p>
			<h1 class="mt-1 text-3xl font-bold">Gastos</h1>
			<p class="mt-2 text-sm text-white/65">
				Registro y control de gastos de la flota vehicular.
			</p>
		</div>

		<button
			onclick={() => (mostrarFormulario = true)}
			class="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-800 shadow-lg transition hover:bg-cyan-50"
		>
			+ Registrar gasto
		</button>
	</div>

	<!-- Indicadores -->
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
		<div class="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
			<p class="text-sm text-white/65">Total de registros</p>
			<p class="mt-2 text-3xl font-bold">{gastos.length}</p>
		</div>

		<div class="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
			<p class="text-sm text-white/65">Gastos acumulados</p>
			<p class="mt-2 text-3xl font-bold text-cyan-200">
				${totalGastos.toLocaleString('es-UY')}
			</p>
		</div>

		<div class="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
			<p class="text-sm text-white/65">Categorías utilizadas</p>
			<p class="mt-2 text-3xl font-bold">
				{new Set(gastos.map((g) => g.categoria)).size}
			</p>
		</div>
	</div>

	<!-- Listado -->
	<div class="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-xl backdrop-blur-xl">
		<h2 class="mb-5 text-lg font-semibold">Historial de gastos</h2>

		<div class="overflow-x-auto">
			<table class="w-full min-w-[750px] text-left text-sm">
				<thead>
					<tr class="border-b border-white/20 text-xs uppercase tracking-wider text-white/50">
						<th class="px-3 py-4">Vehículo</th>
						<th class="px-3 py-4">Fecha</th>
						<th class="px-3 py-4">Categoría</th>
						<th class="px-3 py-4">Descripción</th>
						<th class="px-3 py-4">Importe</th>
					</tr>
				</thead>

				<tbody>
					{#each gastos as gasto (gasto.id)}
						<tr class="border-b border-white/10 transition hover:bg-white/10">
							<td class="px-3 py-4 font-medium">{gasto.vehiculo}</td>
							<td class="px-3 py-4">
								{gasto.fecha.split('-').reverse().join('/')}
							</td>
							<td class="px-3 py-4">
								<span class="rounded-lg border border-cyan-200/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">
									{gasto.categoria}
								</span>
							</td>
							<td class="px-3 py-4">{gasto.descripcion}</td>
							<td class="px-3 py-4 font-semibold text-emerald-200">
								${gasto.importe.toLocaleString('es-UY')}
							</td>
						</tr>
					{:else}
						<tr>
							<td colspan="5" class="px-3 py-10 text-center text-white/60">
								No hay gastos registrados.
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<!-- Formulario -->
	{#if mostrarFormulario}
		<div class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm">
			<div class="my-auto w-full max-w-2xl rounded-3xl border border-white/20 bg-[#29366b] p-6 shadow-2xl">

				<div class="mb-6 flex items-center justify-between">
					<div>
						<h2 class="text-xl font-bold">Registrar gasto</h2>
						<p class="mt-1 text-sm text-white/60">
							Completá los datos del gasto realizado.
						</p>
					</div>

					<button
						type="button"
						onclick={() => (mostrarFormulario = false)}
						class="text-xl text-white/70 transition hover:text-white"
					>
						×
					</button>
				</div>

				<form
					onsubmit={(evento) => {
						evento.preventDefault();
						registrarGasto();
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
						Categoría
						<select
							bind:value={categoria}
							required
							class="w-full rounded-xl border border-white/20 bg-[#344477] px-4 py-3 text-white outline-none"
						>
							<option value="" disabled>Seleccionar categoría</option>
							{#each categorias as nombre}
								<option value={nombre}>{nombre}</option>
							{/each}
						</select>
					</label>

					<label class="space-y-2 text-sm text-white/80 sm:col-span-2">
						Descripción
						<input
							bind:value={descripcion}
							type="text"
							required
							placeholder="Ej.: Carga de combustible"
							class="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/40"
						/>
					</label>

					<label class="space-y-2 text-sm text-white/80">
						Importe ($)
						<input
							bind:value={importe}
							type="number"
							min="0.01"
							step="0.01"
							required
							placeholder="Ej.: 2500"
							class="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none"
						/>
					</label>

					<div class="mt-3 flex items-end justify-end gap-3 sm:col-span-2">
						<button
							type="button"
							onclick={() => (mostrarFormulario = false)}
							class="rounded-xl border border-white/20 px-5 py-3 text-sm transition hover:bg-white/10"
						>
							Cancelar
						</button>

						<button
							type="submit"
							class="rounded-xl bg-gradient-to-r from-violet-400 to-cyan-400 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
						>
							Guardar gasto
						</button>
					</div>
				</form>
			</div>
		</div>
	{/if}

</section>
