
$(function () {

    $('#logout-btn').on('click', function () {
        location.href = '../php/logout.php'
    })

    let btn = $('input[name=q]')
    
    btn.on('keyup',function () {
        // console.log($('input[name=q]').val())
        if (btn.val().length < 1) {
            $('.res').text('')
            return
        }
        $.get(`../php/search.php?q=${btn.val()}`, function (data, status) {
            console.log(data)

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
    let url = profile.profile_url ?? 'https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg'

    let html = `
    <a href="friend.html?u=${profile.username}">
    <div class="post-header">
            <div class="post-avatar">
                <img src="${url}">
            </div>
            <div class="post-username">
                <b>${profile.username}</b>
            </div>
        </div>
</a>`
    return html
}