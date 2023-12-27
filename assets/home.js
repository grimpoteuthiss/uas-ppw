// import './moment'

$(document).ready(function () {
    console.log("okay")

    $.get("../php/posts.php", function (data, status) {
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
                <div class="post-fav">
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
