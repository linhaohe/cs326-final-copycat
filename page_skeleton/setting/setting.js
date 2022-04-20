
import {updatePassword, updateProfileImage, updateProfile} from "../crud.js";

const textBoxName = document.getElementById("Name");

const textBoxEmail = document.getElementById("Email");

const textBoxAddress = document.getElementById("Address");

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
    }else{
        errorText.innerHTML = "";
        await updatePassword(textBoxPassword.value , textBoxPasswordConfirm.value,1);
    }
}

// const handleSaveProfileImage 
const handleSaveProfile = async (event) =>{
    event.preventDefault();
    await updateProfile(textBoxName.value , textBoxEmail.value, textBoxAddress.value,1);
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