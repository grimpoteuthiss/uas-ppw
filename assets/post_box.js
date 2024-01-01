

$( function () {

    $(".show-modal").on('click',function () {
        let overlay = $('<div></div>').addClass('overlay')
        $('body').append($.parseHTML(popup), overlay)

        $('#submit').on('click', function (e) {
            e.preventDefault()
            console.log('clicked')
            let text = $("#text-input").val();
            let data = new FormData();
            data.append('text', text)
            data.append('img', $('input[type=file]')[0].files[0])
            $.ajax({
                method: 'POST',
                url: '../php/posts.php',
                contentType: false,
                async: true,
                data:data,
                processData: false,
                success: function (data) {
                    console.log(data)
                    location.reload()
                }
            })
            // $(".modal").remove()
            // $(".overlay").remove()

        })

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
            <div class="post-box-header-header">
                <div class="post-box-header">
                    <div class="post-avatar">
                               <img src="https://placehold.co/500x500?text=Avatar" alt="" id="u-img">
                    </div>
                    <div class="post-username">
                        <b id="u-username"></b>
                    </div>
                </div>
                <div class="close-btn"><i class="fa fa-close"></i></div>
            </div>
            <form action="../php/posts.php" method="post" enctype="multipart/form-data">
                <div class="post-box-input">
                    <textarea id="text-input" name="text" placeholder="Roar..." required></textarea>
                </div>
                <img src="#" id="blah">

                <div class="post-box-footer">
                    <label for="upload">
                            <span class="material-symbols-outlined" id="add-photo">add_photo_alternate</span>
                          <input type="file" id="upload" name="img" style="visibility: hidden" onchange="readURL(this)">
                    </label>
                    <button class="feed-post-btn" id="submit"  type="submit">Post</button>
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


