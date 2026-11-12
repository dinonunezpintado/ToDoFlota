
<section class="contenedor">

	<!-- Bienvenida -->
	<section class="bienvenida">
		<p class="sobretitulo">BIENVENIDO AL SISTEMA</p>

		<h2>
			Toda tu flota.<br />
			Todo bajo control.
		</h2>

		<p class="descripcion">
			Administrá tus vehículos, mantenimientos y gastos
			desde un solo lugar.
		</p>
	</section>

	<!-- Indicadores principales -->
	<section class="indicadores">

		<article class="tarjeta">
			<span>🚗</span>
			<p>Vehículos registrados</p>
			<strong>12</strong>
		</article>

		<article class="tarjeta">
			<span>🟢</span>
			<p>Vehículos disponibles</p>
			<strong>9</strong>
		</article>

		<article class="tarjeta">
			<span>🔧</span>
			<p>Mantenimientos</p>
			<strong>3</strong>
		</article>

		<article class="tarjeta">
			<span>💰</span>
			<p>Gastos del mes</p>
			<strong>$ 45.800</strong>
		</article>

	</section>

</section>

<style>
	.contenedor {
		width: 100%;
		padding: 25px 0;
	}

	.bienvenida {
		padding: 35px;
		background: rgba(255, 255, 255, 0.10);
		border: 1px solid rgba(255, 255, 255, 0.18);
		border-radius: 24px;
		backdrop-filter: blur(16px);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
	}

	.sobretitulo {
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 2px;
		color: #a5f3fc;
	}

	.bienvenida h2 {
		margin: 18px 0;
		font-size: clamp(30px, 4vw, 42px);
		font-weight: 600;
		line-height: 1.35;
		color: white;
	}

	.descripcion {
		color: rgba(255, 255, 255, 0.75);
		font-size: 15px;
		line-height: 1.7;
	}

	.indicadores {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 18px;
		margin-top: 25px;
	}

	.tarjeta {
		padding: 25px;
		background: rgba(255, 255, 255, 0.12);
		border: 1px solid rgba(255, 255, 255, 0.20);
		border-radius: 22px;
		backdrop-filter: blur(14px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
		transition: transform 0.2s ease, background 0.2s ease;
	}

	.tarjeta:hover {
		transform: translateY(-4px);
		background: rgba(255, 255, 255, 0.18);
	}

	.tarjeta span {
		font-size: 27px;
	}

	.tarjeta p {
		margin: 12px 0 8px;
		color: rgba(255, 255, 255, 0.75);
		font-size: 14px;
	}

	.tarjeta strong {
		font-size: 27px;
		font-weight: 700;
		color: white;
	}

	@media (max-width: 1000px) {
		.indicadores {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 600px) {
		.contenedor {
			padding-top: 10px;
		}

		.bienvenida {
			padding: 25px;
		}

		.indicadores {
			grid-template-columns: 1fr;
		}
	}
</style>
