import { ChangeEvent, useState } from "react";
import { useNavigateService } from "./navigateService";

export function useRegistrationService () {

    /*Service:*/

    const navigateService = useNavigateService();

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

        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/auth/register`, {
            
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

    const afterRegistration = () => {

        if(checkRegister.isRegisterSuccessfulOrTaken.includes('Successful'))
        {

            return{
                pTag:
                    <p className='succesfullRegistration' onClick={() => navigateService.navigate('/login')}>{checkRegister.isRegisterSuccessfulOrTaken}</p>
            }

        }
        else if(checkRegister.isRegisterSuccessfulOrTaken.includes('taken'))
        {

            return{
                pTag:
                <p className='beforeRegistration'>{checkRegister.isRegisterSuccessfulOrTaken}</p>
            }

        }
        else
        {

            return{
                pTag:
                    <p className='beforeRegistration'>Register and click here!</p>
            }

        }

    }

    return{
        registration,
        handleChange,
        checkRegister,
        afterRegistration,
    }

}