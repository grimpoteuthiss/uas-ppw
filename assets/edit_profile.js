$(async function () {
    $('#btn-img').on('click', function () {
        $('#upload').trigger('click')
    })
    await fetchData()
    $('#submit').on('click', async function (e) {
        e.preventDefault()
        let username = await fetchData(true)
        console.log("user " +username)
        let formData = new FormData()
        // let formData = {
        //     old_username: username,
        //     username: $('input[name=username]').val(),
        //     name: $('input[name=name]').val(),
        //     url: $('#u-img').attr('src'),
        // }
        formData.append('old_username', username)
        formData.append('username', $('input[name=username]').val())
        formData.append('name', $('input[name=name]').val())
        formData.append('img', $('#upload')[0].files[0])

        // console.log($('#upload')[0].files[0])
        console.log(formData)
        $.ajax({
            method: 'POST',
            url: '../php/update_profile.php',
            contentType: false,
            async: true,
            data:formData,
            processData: false,
            success: function (data) {
                console.log(data)
                // location.reload()
            }
        })
        // $.post('../php/update_profile.php', formData, function (data, status) {
        //     console.log(data)
        //     fetchData()
        // })
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

function readURL(input) {
    console.log(input)
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#u-img').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}
