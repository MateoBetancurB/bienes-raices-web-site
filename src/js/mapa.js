(function () {
	const lat = document.getElementById("lat").value || 6.2476;
	const lng = document.getElementById("lng").value || -75.5658;
	const mapa = L.map("mapa").setView([lat, lng], 14);
	let marker;

	//utilizar el provider y el geocoder
	const geocodeService = L.esri.Geocoding.geocodeService();

	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
		attribution:
			'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	}).addTo(mapa);

	//ubicacion del pin
	marker = new L.marker([lat, lng], {
		draggable: true,
		autoPan: true,
	}).addTo(mapa);

	//detectar movimiento del pin
	marker.on("moveend", function (e) {
		marker = e.target;
		const posicion = marker.getLatLng();
		mapa.panTo(new L.LatLng(posicion.lat, posicion.lng));

		//obtener la informacion de las calles al soltar el pin
		geocodeService
			.reverse()
			.latlng(posicion, 14)
			.run(function (error, resultado) {
				marker.bindPopup(resultado.address.LongLabel);

				//llenar los campos
				document.querySelector(".calle").textContent =
					resultado?.address?.Address ?? "";
				document.getElementById("calle").value =
					resultado?.address?.Address ?? "";
				document.getElementById("lat").value = resultado?.latlng?.lat ?? "";
				document.getElementById("lng").value = resultado?.latlng?.lng ?? "";
			});
	});
})();
