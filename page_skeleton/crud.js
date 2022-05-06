export async function updatePassword(Password,userId){
    const reponse = await fetch(`/account/${userId}/profilePassword`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Password: Password})
    });

    const data = await reponse.json();
    
    return data;
}

export async function updateProfileImage(imgURL, userId){
    const reponse = await fetch(`/account/${userId}/profileImage`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imgURL:imgURL})
    });

    const data = await reponse.json();
    
    return data;
}

export async function updateProfile(name,email,address,userId){
    const reponse = await fetch(`/account/${userId}/profile`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, email:email,address:address})
    });

    const data = await reponse.json();
    
    return data;
}

export async function readActivityDatetimes(activityType, timeFrom, timeTo) {
    // timeFrom and timeTo are JSON.stringified versions of Date objects
    const response = await fetch(`/activities?activityType=${activityType}&timeFrom=${timeFrom}&timeTo=${timeTo}`, {
        method: 'GET',
    });
    const data = await response.json();
    return data
}

async function login(username, password) {
    const response = await fetch(`/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password})
    });

    return response.json();
}

document.getElementById('submit')?.addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const accessToken = JSON.stringify(await login(username, password));
    localStorage.setItem('accessToken', accessToken);
    window.location.replace("http://localhost:3000/dashboard");
});