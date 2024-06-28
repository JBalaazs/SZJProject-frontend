import { useState } from "react";

export function useRegistrationService () {

    /*useState:*/

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [atLeast5Characters, setAtLeast5Characters] = useState(false);
    const [atLeast1UppercaseLetter, setAtLeast1UppercaseLetter] = useState(false);
    const [correctUsername, setCorrectUsername] = useState(false);
    const [registerSuccessful, setRegisterSuccessful] = useState('');

    /*onChange:*/

    const onChange_username : React.ChangeEventHandler<HTMLInputElement> = (event) => {

        let usernameTest = event.target.value;

        const validCharacters = /^[a-zA-Z][A-Za-z0-9]+$/.test(usernameTest);

        if( validCharacters )
        {
            setUsername(usernameTest);
            setCorrectUsername(true);
        }
        else
        {
            setCorrectUsername(false);
        }

    }

    const onChange_password : React.ChangeEventHandler<HTMLInputElement> = (event) => {

        let passwordTest = event.target.value;
        if(passwordTest.length < 5)
        {

            setAtLeast5Characters(false);

        }
        else
        {

            setAtLeast5Characters(true);
            setPassword(passwordTest);

        }

        if(!/[A-Z]/.test(passwordTest))
        {

            setAtLeast1UppercaseLetter(false)

        }
        else
        {

            setAtLeast1UppercaseLetter(true);
            setPassword(passwordTest);

        }

    }

    /*Function:*/

    const registration = () => {

        fetch('http://localhost:8081/api/user/auth/register', {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})

        })

        setRegisterSuccessful('Successful registration. Click here!');

    }

    return{
        onChange_username,
        onChange_password,
        atLeast1UppercaseLetter,
        atLeast5Characters,
        registration,
        registerSuccessful,
        correctUsername
    }

}