$(function () {

    $.get('../php/get_current_user.php', function (data, status) {
        let user = JSON.parse(data)
        if (user.profile_url != null) {
            $('#u-img').attr('src', user.profile_url)
        }
        $('#u-name').text(user.name)
        $('#u-username').text(user.username)
        console.log(user.following)
        $('#u-folls').text(user.followers)
        $('#u-follw').text(user.following)
    })

    $('#logout-btn').on('click', function () {
        location.href = '../php/logout.php'
    })

    $('#folls-btn').on('click', async function () {
        let modal = $.parseHTML(popup)
        let data = await $.get('../php/get_current_user.php')
        let username = JSON.parse(data).username
        data = await $.get('../php/get_folls.php?u=' + username)
        data = JSON.parse(data)

        let overlay = $('<div></div>').addClass('overlay')
        $('body').append(modal, overlay)
        data.forEach((foll)=>appendComments(foll))
        $(modal).find('#stats').text("Followers")
        $(".close-btn").on('click',function () {
            $(".modal").remove()
            $(".overlay").remove()
        })
    })

    $('#follw-btn').on('click', async function () {
        let modal = $.parseHTML(popup)
        let data = await $.get('../php/get_current_user.php')
        let username = JSON.parse(data).username
        data = await $.get('../php/get_follw.php?u=' + username)
        data = JSON.parse(data)

        let overlay = $('<div></div>').addClass('overlay')
        $('body').append(modal, overlay)
        data.forEach((foll)=>appendComments(foll))
        $(modal).find('#stats').text("Following")
        $(".close-btn").on('click',function () {
            $(".modal").remove()
            $(".overlay").remove()
        })
    })


    $.get("../php/my_posts.php", function (data, status) {
        console.log(data)
        let posts = JSON.parse(data)
        console.log(posts)
        posts.forEach((post) => appendPost(post))

        $('.post-body').on('click', function () {
            console.log('printed')
            location.href = 'detail_page.html?id=' + $(this).data('id')
        })
    })
})


function appendPost(data) {

    let image =data.image_url !== null?  `<div class="post-img">
            <img src="${data.image_url}">
        </div>` : ''

    const timestamp = Date.parse(data.created_at);
    const formattedTime = timeAgo(timestamp);
    let url = data.profile_url ?? 'https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg'

    let post = `<div class="post">
    <div class="post-body" data-id="${data.id}">
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



function appendComments(data) {
    console.log(data)
    let url = data.profile_url ?? 'https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg'
    let foll =  `
                <div class="post-header">
                    <div class="post-avatar">
                        <img src="${url}">
                    </div>
                    <div class="post-username" onclick="location.href='friend.html?u=${data.username}'">
                        <b>${data.username}</b>
                    </div>
                </div>`
    $("#folls").append(foll)

}

let popup = `
        <div class="box modal" id="modal">
            <div class="post-box">
                <div class="popup-head">
                
                <h3 id="stats">Followers</h3>
                <div class="close-btn"><i class="fa fa-close"></i></div>

                </div>

                <hr>

                <div id="folls">
                
                </div>

            </div>
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
