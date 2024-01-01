$(async function () {
    await fetchData()
    $('#submit').on('click', async function (e) {
        e.preventDefault()
        let username = await fetchData(true)
        console.log("user " +username)
        let formData = {
            old_username: username,
            username: $('input[name=username]').val(),
            name: $('input[name=name]').val(),
            url: $('#u-img').attr('src'),
        }
        console.log(formData)
        $.post('../php/update_profile.php', formData, function (data, status) {
            console.log(data)
            fetchData()
        })
    })

})

async function fetchData(ignore) {
    let username = ''
    let data = await $.get('../php/get_current_user.php')
    console.log(data)
    let user = JSON.parse(data)
    username = user.username
    if (ignore) return username
    $('input[name=username]').val(user.username)
    $('input[name=name]').val(user.name)
    $('#u-img').attr('src', user.profile_url)
    return username
}