console.log('connnected');

const login = (id)=>{
    console.log('clicked', id);
    const inputName = document.getElementById('input-name');
    const userName = inputName.value
    console.log(userName);

    const inputPassoword = document.getElementById('input-password');
    const userPassword = inputPassoword.value
    console.log(userPassword);

      const userInput = "admin"
const passInput = "admin123"

    if(userName === userInput  && userPassword === passInput){
        
        console.log('ook');
        window.location.assign('/main.html')
    }else{
        alert('Invalid User Name or Password', )
    return
}
}