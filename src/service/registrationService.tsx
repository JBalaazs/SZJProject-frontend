import { ChangeEvent, useState } from "react";

export function useRegistrationService () {

    /*useState:*/

    const [checkRegister, setCheckRegister] = useState({

        atLeast5Characters: false,
        atLeast1UppercaseLetter: false,
        correctUsername: false,
        isRegisterSuccessfulOrTaken: ''
        
    });

    const [registerData, setRegisterData] = useState({

        username: '',
        password: '',

    });

    /*onChange:*/

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

        const {name, value} = event.target;

        if(name == 'username')
        {

            const validCharacters = /^[a-zA-Z][A-Za-z0-9]+$/.test(value);

            if( validCharacters && (value.length >= 3 && value.length < 10) )
            {

                setRegisterData(prevRegister => ({

                    ...prevRegister,
                    username: value

                }));

                setCheckRegister(prevCheck => ({

                    ...prevCheck,
                    correctUsername: true

                }));

            }
            else
            {

                setCheckRegister(prevCheck => ({

                    ...prevCheck,
                    correctUsername: false

                }));

            }

        }

        if(name == 'password')
        {

            if(value.length < 5)
            {
        
                setCheckRegister(prevCheck => ({

                    ...prevCheck,
                    atLeast5Characters: false

                }));
        
            }
            else
            {
        
                setCheckRegister(prevCheck => ({

                    ...prevCheck,
                    atLeast5Characters: true

                }));

                setRegisterData(prevRegister => ({

                    ...prevRegister,
                    password: value

                }));
        
            }
        
            if(!/[A-Z]/.test(value))
            {
        
                setCheckRegister(prevCheck => ({

                    ...prevCheck,
                    atLeast1UppercaseLetter: false

                }));
        
            }
            else
            {
        
                setCheckRegister(prevCheck => ({

                    ...prevCheck,
                    atLeast1UppercaseLetter: true

                }));

                setRegisterData(prevRegister => ({

                    ...prevRegister,
                    password: value

                }));
        
            }

        }

    }

    /*Function:*/

    const registration = async () => {

        const response = await fetch('http://localhost:8081/api/user/auth/register', {
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)

        });

        if(response.ok)
        {

            setCheckRegister(prevCheck => ({

                ...prevCheck,
                isRegisterSuccessfulOrTaken: 'Successful registration. Click here!'
    
            }));

        }
        else
        {

            setCheckRegister(prevCheck => ({

                ...prevCheck,
                isRegisterSuccessfulOrTaken: 'This name is already taken.'
    
            }));

        }

    }

    return{
        registration,
        handleChange,
        checkRegister
    }

}