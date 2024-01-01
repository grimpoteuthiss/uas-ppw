$(document).ready(function () {

    const urlParams = new URLSearchParams(window.location.search);
    const uname = urlParams.get('u');

    console.log("hmmmmmm")

    $('#u-folkah').on('click', function () {
        $.post('../php/toggle_folls.php?u=' + uname, function (data, success) {
            console.log(data)
            location.reload()
        })
    })

    $.get('../php/get_uname.php?u=' + uname, function (data, status) {
        console.log(data)
        let user = JSON.parse(data)
        if (user.profile_url != null) {
            $('#u-img').attr('src', user.profile_url)
        }
        if (user.is_following === 1) {
            console.log("yess")
            console.log(user.is_following)
            console.log(user.is_following === 1)
            $('#u-folkah').text("Unfollow")

        }
        $('#u-name').text(user.name)
        $('#u-username').text(user.username)
        $('#u-folls').text(user.followers)
        $('#u-follw').text(user.following)
    })

    $.get("../php/user_post.php?u=" + uname, function (data, status) {
        console.log(data)
        let posts = JSON.parse(data)
        console.log(posts)
        posts.forEach((post) => appendPost(post))
    })
})


function appendPost(data) {

    let image =data.image_url !== null?  `<div class="post-img">
            <img src="${data.image_url}">
        </div>` : ''

    const timestamp = Date.parse(data.created_at);
    const formattedTime = timeAgo(timestamp);

    let post = `<div class="post">
    <div class="post-body">
        <div class="post-header">
            <div class="post-avatar">
                <img src="${data.profile_url}">
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
                <p>${data.text}</p>
                <div class="post-fav" id="${data.id}">
                    <span class="material-symbols-outlined">favorite</span>
                    <span class="material-symbols-outlined">chat_bubble</span>
                </div>
            </div>
        </div>
    </div>
</div>

<hr>`
    // console.log(post.text())
    $("#posts").append(post)
}



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
        return years + 'y ago';
    } else if (months > 0) {
        return months + 'mo ago';
    } else if (days > 0) {
        return days + 'd ago';
    } else if (hours > 0) {
        return hours + 'h ago';
    } else if (minutes > 0) {
        return minutes + 'm ago';
    } else {
        return 'Just now';
    }
}
