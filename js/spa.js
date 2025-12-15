const counterUp = window.counterUp.default;

const callback = (entries) => {
	entries.forEach((entry) => {
		const el = entry.target;
		if (entry.isIntersecting && !el.classList.contains("is-visible")) {
			counterUp(el, {
				duration: 2000,
				delay: 16,
			});
			el.classList.add("is-visible");
		}
	});
};

const IO = new IntersectionObserver(callback, { threshold: 1 });

const el01 = document.querySelector(".counter01");
const el02 = document.querySelector(".counter02");
const el03 = document.querySelector(".counter03");
const el04 = document.querySelector(".counter04");
IO.observe(el01);
IO.observe(el02);
IO.observe(el03);
IO.observe(el04);

$("#navbar").find("a").on("click", function (e) {
	e.preventDefault();

	const target = $(this).data("target");
	$("html, body").animate(
		{
			scrollTop: $(target).offset().top,
		},
		50
	);
});

$(function () {
	$.ajax({
		type: "GET",
		url: "json/CityCountyData.json",
		dataType: "json",
		success: showdata,
		error() {
			console.log("連線失敗");
		},
	});

	function showdata(data) {
		console.log(data);

		data.forEach((item, key) => {
			let selecthtml = `
                    <option value="${item.CityName}">${item.CityName}</option>
                    `;

			$("#cityselect").append(selecthtml);
		});
	}
});
