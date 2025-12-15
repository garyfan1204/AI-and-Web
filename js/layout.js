$(function() {
    let btnhtml = 
    `
        <a href="/web202510/" class="layout" id="toindex">
            <div>
                <i class="fa-solid fa-arrow-left"></i>
            </div>
        </a>
        <a href="#" class="layout" id="totop">
            <div>
                <i class="fa-solid fa-arrow-up"></i>
            </div>
        </a>
    `
    $("body").prepend(btnhtml)
})


$(document).on("click", "#totop", function(e) {
    e.preventDefault();

    $('html, body').animate({
        scrollTop: 0
    }, 50);
})