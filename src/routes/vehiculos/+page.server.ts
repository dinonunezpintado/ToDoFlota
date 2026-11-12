
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

// Tipo de dato para los vehículos
type Vehiculo = {
	id: number;
	padron: string;
	matricula: string;
	marca: string;
	modelo: string;
	anio: number;
	kilometraje: number;
	estado: string;
};

// Datos simulados almacenados en el servidor
let vehiculos: Vehiculo[] = [
	{
		id: 1,
		padron: '12548',
		matricula: 'ABC 1234',
		marca: 'Toyota',
		modelo: 'Corolla',
		anio: 2022,
		kilometraje: 35000,
		estado: 'Disponible'
	},
	{
		id: 2,
		padron: '12549',
		matricula: 'SBA 4567',
		marca: 'Chevrolet',
		modelo: 'Onix',
		anio: 2021,
		kilometraje: 48000,
		estado: 'En mantenimiento'
	},
	{
		id: 3,
		padron: '12550',
		matricula: 'SCB 7890',
		marca: 'Fiat',
		modelo: 'Strada',
		anio: 2023,
		kilometraje: 18000,
		estado: 'Disponible'
	}
];

// GET: enviar los vehículos a la página
export const load: PageServerLoad = async () => {
	return {
		vehiculos
	};
};

// POST: registrar un nuevo vehículo
export const actions: Actions = {
	default: async ({ request }) => {
		const datos = await request.formData();

		const padron = String(datos.get('padron') ?? '').trim();
		const matricula = String(datos.get('matricula') ?? '').trim();
		const marca = String(datos.get('marca') ?? '').trim();
		const modelo = String(datos.get('modelo') ?? '').trim();
		const anio = Number(datos.get('anio'));
		const kilometraje = Number(datos.get('kilometraje') ?? 0);

		// Validaciones básicas
		if (!padron || !matricula || !marca || !modelo || !anio) {
			return fail(400, {
				mensaje: 'Todos los campos obligatorios deben completarse.',
				padron,
				matricula,
				marca,
				modelo
			});
		}

		if (vehiculos.some((vehiculo) => vehiculo.padron === padron)) {
			return fail(400, {
				mensaje: 'Ya existe un vehículo registrado con ese padrón.'
			});
		}

		const nuevoVehiculo: Vehiculo = {
			id: Date.now(),
			padron,
			matricula,
			marca,
			modelo,
			anio,
			kilometraje,
			estado: 'Disponible'
		};

		vehiculos = [...vehiculos, nuevoVehiculo];

		return {
			exito: true,
			mensaje: 'Vehículo registrado correctamente.'
		};
	}
};
