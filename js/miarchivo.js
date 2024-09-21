function mostrarValor(valor) {
    const valorHora = document.getElementById('valorHora');
    valorHora.textContent = `${valor}:00`;

    // Calcular luz natural disponible
    let luzNaturalDisponible;
    if (valor >= 6 && valor <= 18) {
        luzNaturalDisponible = 100 - (Math.abs(12 - valor) * 8.33); // Más luz al mediodía
    } else {
        luzNaturalDisponible = 0; // Noche completa
    }

    // Actualizar el label de luz natural disponible
    const luzNaturalLabel = document.getElementById('luzNatural');
    luzNaturalLabel.textContent = `Luz natural disponible: ${Math.max(0, luzNaturalDisponible.toFixed(2))}%`;
}

function calcularIluminacion() {
    const horaDia = parseInt(document.getElementById('horaDia').value);
    const tipoLampara = document.getElementById('tipoLampara').value; // Obtener tipo de lámpara

    if (isNaN(horaDia) || horaDia < 0 || horaDia > 24) {
        alert('Por favor, ingrese una hora válida.');
        return;
    }

    // Definir luz natural base por hora del día (0 = medianoche, 12 = mediodía)
    let luzNaturalDisponible;
    if (horaDia >= 6 && horaDia <= 18) {
        luzNaturalDisponible = 100 - (Math.abs(12 - horaDia) * 8.33); // Más luz al mediodía
    } else {
        luzNaturalDisponible = 0; // Noche completa
    }

    // Cantidad total de luz necesaria (asumimos 400 lux como óptimo)
    const luxNecesarios = 400;

    // Calcular lumens necesarios en función de la luz natural disponible
    const lumensRequeridos = luxNecesarios - luzNaturalDisponible;

    // Definir eficiencia de las lámparas (lumens por watt)
    let eficienciaLumensPorWatt;
    if (tipoLampara === "LED") {
        eficienciaLumensPorWatt = 100; // 100 lumens por watt para lámparas LED
    } else if (tipoLampara === "Incandescente") {
        eficienciaLumensPorWatt = 15; // 15 lumens por watt para lámparas incandescentes
    }

    // Calcular watts necesarios para el tipo de lámpara seleccionado
    const wattsNecesarios = Math.max(lumensRequeridos / eficienciaLumensPorWatt, 0); // Asegurarnos de que no sea negativo

    // Mostrar resultado
    document.getElementById('resultadoIluminacion').textContent = 
        `Para una lámpara ${tipoLampara}, se necesitan aproximadamente ${wattsNecesarios.toFixed(2)} watts.`;

    // Cambiar la opacidad de la luz de la lámpara según los watts necesarios (solo para visualización)
    ajustarVisualizacionLuz(wattsNecesarios);
}

function ajustarVisualizacionLuz(watts) {
    const iluminacion = document.getElementById('iluminacion');

    // Cambiar opacidad (brillo) y tamaño visual basado en watts. Haremos que el efecto sea más evidente.
    const intensidadLuz = Math.min(watts / 60, 1); // Máxima intensidad con 60W
    const tamañoLuz = Math.min(watts / 20, 1.5); // Tamaño visual que cambia de forma más evidente

    iluminacion.style.backgroundColor = `rgba(255, 255, 224, ${intensidadLuz})`; // Aumenta el brillo de la luz
    iluminacion.style.transform = `scale(${tamañoLuz})`; // Aumenta el tamaño de la "luz" para ser más visible
}
