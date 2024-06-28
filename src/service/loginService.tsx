import { useState } from "react";

export function useLoginService () {

    /*useState:*/

    const [usernameText, setUsernameText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [token, setToken] = useState('');

    /*onChange:*/

    const onChange_Username : React.ChangeEventHandler<HTMLInputElement> = (event) => {

        setUsernameText(event.target.value);

    }

    const onChange_Password : React.ChangeEventHandler<HTMLInputElement> = (event) => {

        setPasswordText(event.target.value);

    } 

    /*Function:*/

    async function loginUser(username: string, password: string) {
        
        if(username && password)
        {

            try{

                const response = await fetch('http://localhost:8081/api/user/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({username, password})
                });
    
                if(!response.ok)
                {
                    throw new Error('Failed to login: ' + response.statusText);
                }
    
                const data = await response.json();
                setToken(data);
                console.log('Login successful!', data);

                setErrorMessage('Successful login.');
    
            }
            catch(error){
                setErrorMessage('Incorrect username or password.');
            }

        }
        else
        {

            setErrorMessage('Empty input(s).');

        }

    }

    /*Return:*/

    return{
        errorMessage,
        onChange_Username,
        onChange_Password,
        usernameText,
        passwordText,
        loginUser
    }

}