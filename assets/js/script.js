$(document).ready(function(){
    $("#formHero").on('click', function(event){
        let valorIngresado = $("#valorIngresado").val();
        let resultado = validar(valorIngresado);
        let validacion = validarRangos(valorIngresado);
        const url = 'https://www.superheroapi.com/api.php/4905856019427443/';
        const apiUrl = url + valorIngresado;

        $.ajax({
            type: "GET",
            url: apiUrl,
            dataType: "json",
            success: function(data){
                $('#imagen').attr('src', data.image.url);
                $('#nombre').html(`<h3>Nombre: ${data.name}</h3>`);
                $('#publicado').html(`<p>Publicado: ${data.biography["publisher"]}</p>`);
                $('#alineacion').html(`<p>Alineación: ${data.biography.alignment}</p>`);
                $('#conexiones').html(`<p>Conexiones: ${data.connections["group-affiliation"]}</p>`);
                $('#trabajo').html(`<p>Trabajo: ${data.work.occupation}</p>`);
                $('#aparicion').html(`<p>Aparición: ${data.biography["first-appearance"]}</p>`);
                $('#altura').html(`<p>Altura: ${data.appearance.height}</p>`);
                $('#peso').html(`<p>Peso: ${data.appearance.weight}</p>`);
                $('#alianzas').html(`<p>Alianzas: ${data.biography.aliases}</p>`);
                $('#oculto').show();
            },
            error: function(error){
            }            
        })
        $.ajax({
            type: "GET",
            url: apiUrl,
            dataType: "json",
            success: function(data){
                var chart = new CanvasJS.Chart("chartContainer", {
                    exportEnabled: true,
                    animationEnabled: true,
                    title:{
                        text: `Estadísticas de Poder para ${data.name}`
                        },
                    legend:{
                        cursor: "pointer",
                        itemclick: explodePie
                        },
                    data: [{
                        type: "pie",
                        showInLegend: true,
                        toolTipContent: "{label}: <strong>{y}%</strong>",
                        legendText: "{label}",
                        indexLabel: "{label} {y}",   
                        dataPoints: [
                            { y: `${data.powerstats.intelligence}`, label: "Intelligence" },
                            { y: `${data.powerstats.strength}`, label: "Strength" },
                            { y: `${data.powerstats.speed}`, label: "Speed" },
                            { y: `${data.powerstats.durability}`, label: "Durability" },
                            { y: `${data.powerstats.power}`, label: "Power" },
                            { y: `${data.powerstats.combat}`, label: "Combat" },
                        ]
                    }]
                    });
                    chart.render();
            },
            error: function(error){
            }            
        })
        
    })
});
function explodePie (e) {
	if(typeof (e.dataSeries.dataPoints[e.dataPointIndex].exploded) === "undefined" || !e.dataSeries.dataPoints[e.dataPointIndex].exploded) {
		e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
	} else {
		e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
	}
	e.chart.render();
}

function validar(valorIngresado){
    let pasamosLaValidacion = true;
    let validarNumero = /\d/gim;
    if (validarNumero.test(valorIngresado) == false){
        document.querySelector(".errorNumero").innerHTML = "Debe ingresar solo números.";
        pasamosLaValidacion = false;
    }
}

function validarRangos(valorIngresado){
    if(valorIngresado <= 0 || valorIngresado >= 732){
        alert("Debes ingresar un Número entre 1 y 731");
    }
}
