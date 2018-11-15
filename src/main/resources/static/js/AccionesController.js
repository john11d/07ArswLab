function buscarAcciones(nombreAccion) {
	axios.get('/acciones/search/' + nombreAccion).then(function (response) {
		document.getElementById("Options").innerHTML = "";
		var data = response.data["bestMatches"];
		for(var i in data){
			var options = document.getElementById("Options");
			var a = document.createElement("A");
			a.setAttribute("id", data[i][Object.keys(data[i])[0]]);
			a.setAttribute("onclick", "setAccion(this.id)");
			a.setAttribute("href", "#");
			a.innerHTML=data[i][Object.keys(data[i])[1]];
			options.appendChild(a);
			options.appendChild(document.createElement("BR"));
		}
	})
}

function obtenerAcciones(rango, nombreAccion){
	console.log(rango + "---" + nombreAccion);
	axios.get('/acciones/time_series_' + rango + '/' + nombreAccion).then(function (response) {
		document.getElementById("Tabla").innerHTML = "";
		var data = response.data;
		var timeSeries = Object.keys(data)[1];

		//Crear tabla <table> https://getbootstrap.com/docs/4.0/content/tables/
        var table = document.createElement("TABLE");
        table.setAttribute("class","table");

        //Crear encabezado
        var thead = document.createElement("THEAD");
        thead.setAttribute("class","thead-light");

        //Crear fila
        var tr = document.createElement("TR");

        //Crear columnas encabezados
        var encabezados = ["Fecha", "Open", "Hight", "Low", "Close", "Volume"];
        for (e in encabezados) {
        	var th = document.createElement("TH");
			th.setAttribute("scope", "col");
			th.innerHTML = encabezados[e];
			tr.appendChild(th);
        }

        //Agregar las columnas de los encabezados al encabezado. Y agregar este ultimo a la tabla.
        thead.appendChild(tr);
        table.appendChild(thead);

        //Crear cuerpo
        var tbody = document.createElement("TBODY");

		for(i in data[timeSeries]) {
			//Crear fila
        	tr = document.createElement("TR");

			for(j in data[timeSeries][i]){

				console.log(j);
			}
		}
		document.getElementById("Tabla").appendChild(table);
	})
}

function setAccion(nombreAccion) {
	document.getElementById("KeyWords").value = nombreAccion;
}