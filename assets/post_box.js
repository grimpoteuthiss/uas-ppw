// const modal = document.getElementById('modal');
// const openModal = document.getElementById('openModal');
//
// openModal.addEventListener('click', function () {
//     modal.style.display = 'block';
// });

$(document).ready(function () {
    $(".show-modal").click(function () {
        let overlay = $('<div></div>').addClass('overlay')
        $('body').append($.parseHTML(popup), overlay)
        $(".close-btn").click(function () {
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
                        <img src="https://i.pinimg.com/736x/fb/71/1c/fb711c72c45f6675b85bd7382f992bb7.jpg">
                    </div>
                    <div class="post-username">
                        <b>grewnnie_kotoko</b>
                    </div>
                </div>
                <div class="close-btn"><i class="fa fa-close"></i></div>
            </div>
            <form>
                <div class="post-box-input">
                    <input type="text" placeholder="Roar..." />
                </div>

                <div class="post-box-footer">
                    <span class="material-symbols-outlined">add_photo_alternate</span>
                    <button class="feed-post-btn">Post</button>
                </div>
            </form>
        </div>
    </div>`


// window.addEventListener('click', function (event) {
//     if (event.target == modal) {
//         modal.style.display = 'none';
//     }
// });

