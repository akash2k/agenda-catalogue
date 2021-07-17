let login = ()=>{
    let username = $('#l_username').val();
    let password = $('#l_password').val();
    $.ajax({
        url: `http://127.0.0.1:3000/login/`,
        type: "POST",
        data: {'username': username, 'password': password},
        success: (data,status)=>{
            if(data.auth){
                window.location.href = `http://127.0.0.1:3000/${username}`
            }else alert("User not registered");
        }
    })
    return false;
}
let signup = ()=>{
    let username = $('#s_username').val();
    let password = $('#s_password').val(); 
    
        console.log("You have been registered successfuly!")
                     
        if(username.length >=5 && username.length<12){
            $.ajax({
                url: `http://127.0.0.1:3000/signup/`,
                type: "POST",
                data: {'username': username, 'password': password},
                success: (data,status)=>{
                    if(data.save){
                        window.location.href = `http://127.0.0.1:3000/${username}`
                    }
                }
            })
            return false;
        }
        else{
            alert("The length of username should be between 5 to 11 characters")
        }
}