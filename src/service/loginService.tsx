import { ChangeEvent, useState } from "react";

export function useLoginService () {

    /*useState:*/

    const [errorMessage, setErrorMessage] = useState('');

    const [loginData, setLoginData] = useState({

        username: '',
        password: ''

    });

    /*onChange:*/

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

        const {name, value} = event.target;

        setLoginData(prevLogin => ({

            ...prevLogin,
            [name]: value 

        }));

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
                    body: JSON.stringify(loginData)
                });
    
                if(!response.ok)
                {
                    throw new Error('Failed to login: ' + response.statusText);
                }
    
                const returnData = await response.json();
                localStorage.setItem('token', returnData.data);

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
        loginData,
        handleChange,
        loginUser
    }

}