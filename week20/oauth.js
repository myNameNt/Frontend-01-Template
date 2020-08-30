let url = 'https://github.com/login/oauth/authorize?client_id=Iv1.96937abd1cce7fe7&redirect_uri=http%3A%2F%2Flocalhost%3A8000&scope=read%2Fuse&state=haha'
let client_id = 'Iv1.96937abd1cce7fe7'
let redirect_uri = 'http%3A%2F%2Flocalhost%3A8000'
let scope = 'read%2Fuse'
let state = 'haha'

const code = '4e50e733e10c52d87ad9'
const state = 'haha'

{
    const code = '4e50e733e10c52d87ad9'
    const state = 'haha'
    const client_secret = 'ad94b1adc5e3b1c0667b0fb6de79d8a5e070cb5a'
    const client_id = 'Iv1.96937abd1cce7fe7'
    const redirect_uri = encodeURIComponent('http://localhost:8000')

    const params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`
    let xhr = new XMLHttpRequest
    xhr.open('POST', `https://github.com/login/oauth/access_token?${params}`, true)
    xhr.send(null)
    xhr.addEventListener('readystatechanges', function (event) {
        if (xhr.readyState === 4) {
            console.log(xhr.responseText)
        }
    })
}

{
    let access_token = '045edfd8f1b7334fd549d608338cf19f6ce6a786'
    let xhr = new XMLHttpRequest
    xhr.open('GET', `https://api.github.com/user`, true)
    xhr.setRequestHeader('Authorization', `token ${access_token}`)
    xhr.send(null)
    xhr.addEventListener('readystatechanges', function (event) {
        if (xhr.readyState === 4) {
            console.log(xhr.responseText)
        }
    })
}
