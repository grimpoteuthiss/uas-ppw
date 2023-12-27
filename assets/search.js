
$(document).ready(function () {
    $('#profile-btn').on('click',function () {
        location.href = '../pages/profile_page.html'
    })
    $('#home-btn').on('click',function () {
        location.href = '../pages/home_page.html'
    })
    $('#friends-btn').on('click',function () {
        location.href = '../pages/friends_page.html'
    })

    $.get("../php/friend_posts.php", function (data, status) {
        console.log(data)
        let posts = JSON.parse(data)
        // posts.forEach((post) => appendPost(post))
    })
    
    $('input[name=q]').on('keyup',function () {
        // console.log($('input[name=q]').val())
        if ($('input[name=q]').val().length < 1) {
            $('.res').text('')
            return
        }
        $.get(`../php/search.php?q=${$('input[name=q]').val()}`, function (data, status) {
            // console.log(data)
            let profiles = JSON.parse(data)
            // console.log(profiles)
            let d = document.createElement('div');
            $(d).attr('id', 'yes')
            // $(d).
            // console.log(profiles.length)
            profiles.forEach((profile) => {
                $(d).append(p(profile))
            })
            $('.res').html(d)
        })
    })

})


function p(profile) {
    let html = `
    <div class="post-header">
            <div class="post-avatar">
                <img src="${profile.profile_url}">
            </div>
            <div class="post-username">
                <b>${profile.username}</b>
            </div>
        </div>`
    return html
}