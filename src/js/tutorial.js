function login () {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    fetch('/loginauth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
}