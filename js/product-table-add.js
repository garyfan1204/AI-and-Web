$(function () {
	let name = $("#name");
	let price = $("#price");
	let ok = $("#ok");

	name.on("input", function () {
		if (name.val().length > 0 && name.val().length < 10) {
			name.removeClass("is-invalid");
			name.addClass("is-valid");
		} else {
			name.removeClass("is-valid");
			name.addClass("is-invalid");
		}
	});

	price.on("input", function () {
		if (price.val() > 99 && price.val() < 2001) {
			price.removeClass("is-invalid");
			price.addClass("is-valid");
		} else {
			price.removeClass("is-valid");
			price.addClass("is-invalid");
		}
	});

	ok.on("click", function () {
		if (name.hasClass("is-valid") && price.hasClass("is-valid")) {
			let jsonData = {};
			jsonData["name"] = name.val();
			jsonData["price"] = price.val();
			let product = JSON.stringify(jsonData);
			console.log(product);

			axios
				.post("http://127.0.0.1:3000/products", product)
				.then(function (response) {
					console.log(response);
					if (response.status == 201) {
						Swal.fire({
							icon: "success",
							title: "輸入成功",
							confirmButtonText: "好耶",
						}).then((reuslt) => {
							location.href = "product-table.html";
						});
					} else {
						Swal.fire({
							icon: "warning",
							title: "輸入失敗",
							confirmButtonText: "喔不",
						}).then((reuslt) => {
							return;
						});
					}
				})
				.catch(function (error) {
					console.log(error);
				})
				.finally(function () {});
		} else {
			Swal.fire({
				icon: "error",
				title: "欄位有誤",
				text: "請依規定輸入",
			});
		}
	});
});
