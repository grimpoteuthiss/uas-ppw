

$(document).ready( function () {

    $(".show-modal").on('click',function () {
        let overlay = $('<div></div>').addClass('overlay')
        $('body').append($.parseHTML(popup), overlay)
        $.get('../php/get_current_user.php', function (data, status) {
            console.log(data)
            let user = JSON.parse(data)
            if (user.profile_url != null) {
                $('#u-img').attr('src', user.profile_url)
            }
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
            <div class="post-box-header-header">
                <div class="post-box-header">
                    <div class="post-avatar">
                               <img src="https://i.pinimg.com/736x/fb/71/1c/fb711c72c45f6675b85bd7382f992bb7.jpg" alt="" id="u-img">
                    </div>
                    <div class="post-username">
                        <b id="u-username"></b>
                    </div>
                </div>
                <div class="close-btn"><i class="fa fa-close"></i></div>
            </div>
            <form>
                <div class="post-box-input">
                    <textarea placeholder="Roar..."></textarea>
                </div>
                <img src="#" id="blah">

                <div class="post-box-footer">
                    <label for="upload">
                            <span class="material-symbols-outlined" id="add-photo">add_photo_alternate</span>
                          <input type="file" id="upload" style="display:none" onchange="readURL(this)">
                    </label>
<!--                    <span class="material-symbols-outlined" id="add-photo">add_photo_alternate</span>-->
                    <button class="feed-post-btn">Post</button>
                </div>
            </form>
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


