$(async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (id === "deleted") {
        let mainPost = $('#main-post')
        let p = $.parseHTML(success)
        mainPost.html(p)
        $('.post-box').hide()
    } else {
        let input = $('#reply')
        let submit = $('#submitReply')

        input.on('keyup', function () {
            if (input.val().length > 0) {
                console.log('oke nihhh')
                submit.addClass('feed-post-btn')
                submit.removeClass('feed-post-btn-disabled')
                submit.attr('disabled', false)
            } else {
                console.log('not okey')
                submit.addClass('feed-post-btn-disabled')
                submit.removeClass('feed-post-btn')
                submit.attr('disabled', true)
            }
        })

        submit.on('click', function (e) {
            e.preventDefault()
            let formData = {
                comment: input.val(),
                post: id,
            }
            $.post('../php/add_comment.php', formData, function (data, status) {
                appendComments(JSON.parse(data))
                submit.addClass('feed-post-btn-disabled')
                submit.removeClass('feed-post-btn')
                submit.attr('disabled', true)
                input.val('')
            })
        })

        $.get('../php/get_current_user.php', function (data, status) {
            // console.log(data)
            let user = JSON.parse(data)
            if (user.profile_url != null) {
                $('#u-img').attr('src', user.profile_url)
            }
            $('#u-name').text(user.name)
            $('#u-username').text(user.username)
        })

        let data = await $.get('../php/post_by_id.php?id=' + id)
        let p = buildPost(JSON.parse(data))
        let isUser = await $.get('../php/is_user_post.php?pid='+id)
        let mainPost = $('#main-post')
        mainPost.html(p)
        console.log(isUser)
        if (JSON.parse(isUser) === 0) {
            console.log('here')
            mainPost
                .find('.show-modal')
                .hide()
        } else {
            console.log('there')
            mainPost
                .find(".show-modal")
                .on('click',function () {
                    let overlay = $('<div></div>').addClass('overlay')
                    $('body').append($.parseHTML(popup), overlay)
                    $("#delete-btn").on('click',function () {
                        $.get('../php/delete_post.php?pid=' + id, function (data, status) {
                            console.log(data)
                            location.href = 'detail_page.html?id=deleted'
                        })

                        // alert("sucess deleted")
                    });
                    $("#cancel-btn").on('click',function () {
                            $(".modal").remove()
                            $(".overlay").remove()
                        }
                    );
                })
        }




        $.get("../php/get_comments.php?id=" +id, function (data, status) {
            let posts = JSON.parse(data)
            posts.forEach((post) => appendComments(post))

        })
    }

})

let success = `
    <p>Post deleted successfully</p>
`

function buildPost(data) {
    let image =data.image_url !== null?  `<div class="post-img">
            <img src="${data.image_url}">
        </div>` : ''

    const timestamp = Date.parse(data.created_at);
    const formattedTime = timeAgo(timestamp);
    let url = data.profile_url ?? 'https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg'

    return `
        <div class="post-header">
            <div class="post-avatar">
                <img src="${url}">
            </div>
            <div class="post-username">
                <b>${data.username}</b>
            </div>
            <div class="post-time">
                <p>· ${formattedTime}</p>
            </div>
        </div>`
        + image +
        `<div class="post-footer">
            <div class="post-desc">
                <pre>${data.text}</pre>
                <div class="post-fav">
                    <div class="p-fav-items">
                        <div class="p-fav-item">
                        <span class="material-symbols-outlined">favorite</span>
                            <pre>${data.l_count}</pre>
                        </div>
                        <div class="p-fav-item">
                            <span class="material-symbols-outlined">chat_bubble</span>
                            <pre>${data.c_count}</pre>
                        </div>
                    </div>
                    <button class="show-modal">
                        <span class="material-symbols-outlined">more_horiz</span>
                    </button>
                </div>
            </div>
        </div>`
}


function appendComments(data) {

    const timestamp = Date.parse(data.created_at);
    console.log(timestamp)
    console.log(Date.now().toPrecision())
    const formattedTime = timeAgo(timestamp);
    let url = data.profile_url ?? 'https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg'

    let post = `
        <div class="post">
            <div class="post-body">
                <div class="post-header">
                    <div class="post-avatar">
                        <img src="${url}">
                    </div>
                    <div class="post-username">
                        <b>${data.username}</b>
                    </div>
                    <div class="post-time">
                        <p>· ${formattedTime}</p>
                    </div>
                </div>


                <div class="post-footer">
                    <div class="post-desc">
                        <pre>${data.comment}</pre>
                        <div class="post-fav">
                            <span class="material-symbols-outlined">favorite</span>
                            <!-- <span class="material-symbols-outlined">chat_bubble</span> -->
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <hr>`
    // console.log(post.text())
    $("#comments").append(post)
}



let popup = `
        <div class="box modal" id="modal">
            <button id="delete-btn">
                <h3 class="delete">Delete</h3>
            </button>
            <hr>
            <br>
            <button id="cancel-btn">
            <h3 class="cancel">Cancel</h3>
            </button>
        </div>`



function timeAgo(timestamp) {
    const currentDate = new Date();
    const targetDate = new Date(timestamp);

    const seconds = Math.floor((currentDate - targetDate) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
        return years + 'y';
    } else if (months > 0) {
        return months + 'mo';
    } else if (days > 0) {
        return days + 'd';
    } else if (hours > 0) {
        return hours + 'h';
    } else if (minutes > 0) {
        return minutes + 'm';
    } else {
        return 'Just now';
    }
}
