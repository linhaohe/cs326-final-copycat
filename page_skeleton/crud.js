export async function updatePassword(Password,userId){
    const reponse = await fetch(`/account/${userId}/profilePassword`,{
        method: 'POST',
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
        method: 'POST',
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
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, email:email,address:address})
    });

    const data = await reponse.json();
    
    return data;
}