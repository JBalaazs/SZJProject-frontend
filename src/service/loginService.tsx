import { useState } from "react";
import { useUserService } from '../service/userService';

export function useLoginService () {

    /*useState:*/

    const [usernameText, setUsernameText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    /*Service:*/

    const userData = useUserService();

    /*onChange:*/

    const onChange_Username : React.ChangeEventHandler<HTMLInputElement> = (event) => {

        setUsernameText(event.target.value);

    }

    const onChange_Password : React.ChangeEventHandler<HTMLInputElement> = (event) => {

        setPasswordText(event.target.value);

    } 

    /*Function:*/

    const handleLogin = (usernameText: string, passwordText: string) => {

        if(usernameText && passwordText)
        {

            let trueOrFalse = userData.login(usernameText, passwordText);

            if(trueOrFalse)
            {
                setErrorMessage('Successful login.');
            }
            else
            {
                setErrorMessage('Incorrect username or password.');
            }

        }
        else
        {
            setErrorMessage('Empty input(s).');
        }

    }

    return{
        handleLogin, 
        errorMessage,
        onChange_Username,
        onChange_Password,
        usernameText,
        passwordText
    }

}