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

$(function() {
    var username = $("#username")
    var password = $("#password")
    var confirm_pwd = $("#confirm_pwd")
    var register = $("#register")
	var name = $("#name")
	var pwd = $("#pwd")
	var login = $("#login")
	var timer = null

    username.on("input", function () {
		var isexist = $("#isexist")
		clearTimeout(timer)

		timer = setTimeout(() => {
			if (username.val().length > 0 && username.val().length < 11) {
				axios
					.post("http://127.0.0.1:5000/api/checkuni", {
						username: username.val()
					})
					.then((response) => {
						console.log(response)
						if(response.data.status) {
							username.removeClass("is-invalid");
							username.addClass("is-valid");
						}
						else {
							username.removeClass("is-valid")
							username.addClass("is-invalid")
							isexist.text(response.data.error)
						}
					})
					.catch((error) => {
						console.log(error);
					});
			}
			else {
				username.removeClass("is-valid");
				username.addClass("is-invalid");
				isexist.text("請輸入長度10以內的英數字")
			}
		}, 500);
	});

    password.on("input", function() {
        confirm_pwd.val("")
        
        if(password.val().length > 0 && password.val().length < 17) {
            password.removeClass("is-invalid")
            password.addClass("is-valid")
        }
        else {
            password.removeClass("is-valid")
            password.addClass("is-invalid")
        }
    })
    
    confirm_pwd.on("input", function() {
        if(confirm_pwd.val() == password.val()) {
            confirm_pwd.removeClass("is-invalid")
            confirm_pwd.addClass("is-valid")
        }
        else {
            confirm_pwd.removeClass("is-valid")
            confirm_pwd.addClass("is-invalid")
        }
    })

    register.on("click", function() {
        if(username.hasClass("is-valid") && password.hasClass("is-valid") && confirm_pwd.hasClass("is-valid")) {
            let jsonData = {
                username: username.val(),
                password: password.val()
            }
            
            axios.post("http://127.0.0.1:5000/api/register", jsonData)
            .then(function(response) {
                console.log(response)
                if (response.status == 200) {
			    	Swal.fire({
			    		icon: "success",
			    		title: "註冊成功",
			    		confirmButtonText: "好耶",
			    	}).then((reuslt) => {
                        bootstrap.Modal.getOrCreateInstance("#registerModal").hide()
			    	});
			    } else {
			    	Swal.fire({
			    		icon: "warning",
			    		title: "註冊失敗",
			    		confirmButtonText: "喔不",
			    	}).then((reuslt) => {
			    		return;
			    	});
			    }
            })
            .catch(function(error) {
                console.log(error)
            })
            .finally(function() {

            })
        }
        else {
	        Swal.fire({
	        	icon: "error",
	        	title: "欄位有誤",
	        	text: "請依規定輸入",
	        });
        }
    })

    name.on("input", function () {
		name.removeClass("is-invalid");
		name.addClass("is-valid");
		if (name.val().length > 0 && name.val().length < 11) {
			axios
				.post("http://127.0.0.1:5000/api/checkuni", {
					name: name.val()
				})
				.then((response) => {
					if(response.data.status) {
					}
					else {
						name.removeClass("is-valid")
						name.addClass("is-invalid")
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
		else {
			name.removeClass("is-valid");
			name.addClass("is-invalid");
		}
	});

    pwd.on("input", function() {        
        if(pwd.val().length > 0 && pwd.val().length < 13) {
            pwd.removeClass("is-invalid")
            pwd.addClass("is-valid")
        }
        else {
            pwd.removeClass("is-valid")
            pwd.addClass("is-invalid")
        }
    })

	login.on("click", function() {if(name.hasClass("is-valid") && pwd.hasClass("is-valid")) {
            let jsonData = {
                username: name.val(),
                password: pwd.val()
            }
            
            axios.post("http://127.0.0.1:5000/api/login", jsonData)
            .then(function(response) {
                console.log(response)
                if (response.data.status) {
			    	Swal.fire({
			    		icon: "success",
			    		title: response.data.message,
			    		confirmButtonText: "好耶",
			    	}).then((reuslt) => {
                        bootstrap.Modal.getOrCreateInstance("#loginModal").hide()
						$("#loginbtn").addClass("d-none")
						$("#registerbtn").addClass("d-none")
			    	});
			    }
				else {
			    	Swal.fire({
			    		icon: "warning",
			    		title: response.data.message,
			    		confirmButtonText: "喔不",
			    	}).then((reuslt) => {
						bootstrap.Modal.getOrCreateInstance("#loginModal").hide()
			    		return;
			    	});
			    }
            })
            .catch(function(error) {
                console.log(error)
            })
            .finally(function() {

            })
        }
        else {
	        Swal.fire({
	        	icon: "error",
	        	title: "欄位有誤",
	        	text: "請依規定輸入",
	        });
        }
	})
})