let alldata = [];
let currentPage = 0;
let name = $("#name");
let price = $("#price");
let update = $("#update");
let tbody = $("#tbody");
let mypage = $("#mypage");

$(function () {
	getProduct();

	tbody.on("click", ".btn-update", function () {
		console.log($(this).data("id"));
		console.log($(this).data("name"));
		console.log($(this).data("price"));

		$("#id").val($(this).data("id"));
		$("#name").val($(this).data("name"));
		$("#price").val($(this).data("price"));
	});

	tbody.on("click", ".btn-delete", function () {
		Swal.fire({
			title: "確定要刪除嗎😭",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "是的",
			cancelButtonText: "還是不要好了",
		}).then((result) => {
			if (result.isConfirmed) {
				console.log($(this).data("id"));
				let id = $(this).data("id");

				axios
					.delete(`http://127.0.0.1:3000/products/${id}`)
					.then(function (response) {
						console.log(response);
						if (response.status == 200) {
							Swal.fire({
								icon: "success",
								title: "刪除成功",
								confirmButtonText: "好耶",
							}).then((reuslt) => {
								if (reuslt.isConfirmed) {
									getProduct();
								}
							});
						} else {
							Swal.fire({
								icon: "warning",
								title: "刪除失敗",
								confirmButtonText: "喔不",
							}).then((reuslt) => {
								if (reuslt.isConfirmed) {
									return;
								}
							});
						}
					})
					.catch(function (error) {
						console.log(error);
					})
					.finally(function () {});
			}
		});
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

	update.on("click", function () {
		if (price.hasClass("is-valid")) {
			let id = $("#id").val();
			let jsonData = {};

			jsonData["name"] = name.val();
			jsonData["price"] = price.val();
			let product = JSON.stringify(jsonData);
			console.log(product);

			axios
				.put(`http://127.0.0.1:3000/products/${id}`, product)
				.then(function (response) {
					console.log(response);
					if (response.status == 200) {
						Swal.fire({
							icon: "success",
							title: "更新成功",
							confirmButtonText: "好耶",
						}).then((reuslt) => {
							if (reuslt.isConfirmed) {
								bootstrap.Modal.getOrCreateInstance("#updateModal").hide();
								getProduct();
							}
						});
					} else {
						Swal.fire({
							icon: "warning",
							title: "更新失敗",
							confirmButtonText: "喔不",
						}).then((reuslt) => {
							if (reuslt.isConfirmed) {
								return;
							}
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

	mypage.on("click", ".page-link", function () {
		event.preventDefault();
		currentPage = $(this).data("id");
		renderTable(currentPage);
		renderPage(currentPage);
	});
});

function getProduct() {
	axios
		.get("http://127.0.0.1:3000/products")
		.then(function (response) {
			data = response.data;
			alldata = [];

			console.log(data);

			response.data.forEach((item, key) => {
				if (key % 10 == 0) {
					alldata.push([]);
				}
				page = parseInt(key / 10);
				alldata[page].push(item);
			});

			console.log(alldata);
			renderTable(currentPage);
			renderPage(currentPage);
		})
		.catch(function (error) {
			console.log(error);
		})
		.finally(function () {
			// always executed
		});
}

function renderTable(page) {
	tbody.empty();
	alldata[page].forEach((item) => {
		let datahtml =
		`
            <tr>
                <td data-th="產品編號">${item.id}</td>
                <td data-th="產品名稱">${item.name}</td>
                <td data-th="產品價格">${item.price}</td>
                <td>
                    <button class="btn btn-warning btn-update" data-bs-toggle="modal" data-bs-target="#updateModal" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">更新</button>
                    <button class="btn btn-danger btn-delete" data-id="${item.id}">刪除</button>
                </td>
            </tr>
        `;
		$("#tbody").append(datahtml);
	});
}

function renderPage(page) {
	let mypage = $("#mypage");
	let pagehtml;
	mypage.empty();

	if (page > 0) {
		pagehtml =
		`
            <li class="page-item">
				<a class="page-link" href="#" data-id="${page - 1}">&laquo;</a>
			</li>
        `
		mypage.append(pagehtml);
	}

	alldata.forEach((item, key) => {
		if (page == key) {
			pagehtml = 
			`
                <li class="page-item">
					<a class="page-link active" href="#" data-id="${key}">${key + 1}</a>
				</li>
            `
		}
		else {
			pagehtml =
			`
                <li class="page-item">
					<a class="page-link" href="#" data-id="${key}">${key + 1}</a>
				</li>
            `
		}
		mypage.append(pagehtml)
	});

	if (page < alldata.length - 1) {
		pagehtml =
		`
            <li class="page-item">
				<a class="page-link" href="#" data-id="${page + 1}">&raquo;</a>
			</li>
        `;

		mypage.append(pagehtml);
	}
}
