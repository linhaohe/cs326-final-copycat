
import {updatePassword, updateProfileImage, updateProfile} from "./crud.js";

const fetchUserInfo = async()=>{
    const result = await fetch("/userInfo",{
        method: "GET"
    }).then(res => {
        if(res.ok){
            return res.json();
        }
        throw new Error("Data not found");
    }).catch(err => {console.error(err)});

    return result;
}
const userInfo = await fetchUserInfo();

console.log(userInfo._id);

const textBoxName = document.getElementById("Name");

textBoxName.placeholder = userInfo.username;



const textBoxEmail = document.getElementById("Email");

textBoxEmail.placeholder = userInfo.email;

const textBoxAddress = document.getElementById("Address");

textBoxAddress.placeholder =  userInfo.address;

const buttonEdit = document.getElementById("saveButton");

const saveProfileImage = document.getElementById("saveImage");


const fileSelector = document.getElementById('chooseFile');

const imgPreview = document.getElementById("previewImage");

const textBoxPassword = document.getElementById("Password");

const textBoxPasswordConfirm = document.getElementById("confirmPassword");

const buttonSavePassword = document.getElementById("changePassword");

const errorText = document.getElementById("error");

const handleUpdatePassword = async (event) =>{
    event.preventDefault();
    if(textBoxPassword.value !== textBoxPasswordConfirm.value){
        errorText.innerHTML = "Password dose not match"
    }else if(textBoxPassword.value.length<=0 || textBoxPasswordConfirm.value.length<=0){
        errorText.innerHTML = "Password cannot be empty"
    }
    else{
        errorText.innerHTML = "Password is Updated";
        await updatePassword(textBoxPassword.value ,userInfo._id);
    }
}

// const handleSaveProfileImage 
const handleSaveProfile = async (event) =>{
    event.preventDefault();
    await updateProfile(textBoxName.value.length>0? textBoxName.value: textBoxName.placeholder, 
        textBoxEmail.value.length>0? textBoxEmail.value: textBoxEmail.placeholder, 
        textBoxAddress.value.length>0? textBoxAddress.value: textBoxAddress.placeholder, userInfo._id);
}

const handleSaveProfileImage = async(event) => {
    event.preventDefault();

    const files = fileSelector.files[0];

    if (files) {
        const fileReader = new FileReader();
    fileReader.readAsDataURL(files);

    fileReader.addEventListener("load", function () {
        imgPreview.innerHTML = '<img class="card-img-top settingImg" src="' + this.result + '" />';
    });    
  }

  await updateProfileImage(this.result,1);



}





buttonEdit.addEventListener('click', handleSaveProfile);

saveProfileImage.addEventListener('click',handleSaveProfileImage);

buttonSavePassword.addEventListener('click',handleUpdatePassword);