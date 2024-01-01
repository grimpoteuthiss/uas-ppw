

$( function () {

    $(".show-modal").on('click',function () {
        let overlay = $('<div></div>').addClass('overlay')
        $('body').append($.parseHTML(popup), overlay)


        $.get('../php/get_current_user.php', function (data, status) {
            console.log(data)
            let user = JSON.parse(data)
            if (user.profile_url != null) {
                console.log(user.profile_url)
            }
            $('#u-img').attr('src', user.profile_url)
            $('#u-name').text(user.name)
            $('#u-username').text(user.username)
        })
        $(".close-btn").on('click',function () {
                $(".modal").remove()
                $(".overlay").remove()
            }
        );
    })
    // console.log("okay")

})

let popup = `
<div class="box modal" id="modal">
            <div class="post-box">

                <h3>Followers</h3>

                <hr>

                <div class="post-header">
                    <div class="post-avatar">
                        <img src="https://i.pinimg.com/564x/64/76/c9/6476c9351269d589550ed2bf5b25c657.jpg">
                    </div>
                    <div class="post-username">
                        <b>dibutuhkan_rsj</b>
                    </div>
                </div>

            </div>
        </div>`

function readURL(input) {
    console.log(input)
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}


