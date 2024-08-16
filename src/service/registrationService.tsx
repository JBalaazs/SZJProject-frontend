import { ChangeEvent, useState } from "react";
import { useNavigateService } from "./navigateService";
import { checkRegisterType } from "../interfaces/InterfaceCollection";
import { authType } from "../interfaces/InterfaceCollection";
import { POST } from "../endpoints/POST";

export function useRegistrationService () {

    /*Service:*/

    const navigateService = useNavigateService();

    /*useState:*/

    const [checkRegister, setCheckRegister] = useState<checkRegisterType | null>(null);

    const [registerData, setRegisterData] = useState<authType | null>(null);
    
    /*endpoints:*/

    const endpoints_POST = POST();

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

                } as authType));

                setCheckRegister(prevCheck => ({

                    ...prevCheck,
                    correctUsername: true

                } as checkRegisterType));

            }
            else
            {

                setCheckRegister(prevCheck => ({

                    ...prevCheck,
                    correctUsername: false

                }as checkRegisterType));

            }

        }

        if(name == 'password')
        {

            if(value.length < 5)
            {
        
                setCheckRegister(prevCheck => ({

                    ...prevCheck,
                    atLeast5Characters: false

                } as checkRegisterType));
        
            }
            else
            {
        
                setCheckRegister(prevCheck => ({

                    ...prevCheck,
                    atLeast5Characters: true

                } as checkRegisterType));

                setRegisterData(prevRegister => ({

                    ...prevRegister,
                    password: value

                } as authType));
        
            }
        
            if(!/[A-Z]/.test(value))
            {
        
                setCheckRegister(prevCheck => ({

                    ...prevCheck,
                    atLeast1UppercaseLetter: false

                } as checkRegisterType));
        
            }
            else
            {
        
                setCheckRegister(prevCheck => ({

                    ...prevCheck,
                    atLeast1UppercaseLetter: true

                } as checkRegisterType));

                setRegisterData(prevRegister => ({

                    ...prevRegister,
                    password: value

                } as authType));
        
            }

        }

    }

    /*Function:*/

    const registration = async () => {

        if(registerData)
        {

            const response = await endpoints_POST.register(registerData)

            if(response.ok)
            {
    
                setCheckRegister(prevCheck => ({
    
                    ...prevCheck,
                    isRegisterSuccessfulOrTaken: 'Successful registration. Click here!'
        
                } as checkRegisterType));
    
            }
            else
            {
    
                setCheckRegister(prevCheck => ({
    
                    ...prevCheck,
                    isRegisterSuccessfulOrTaken: 'This name is already taken.'
        
                } as checkRegisterType));
    
            }

        }        

    }

    const afterRegistration = () => {

        if(checkRegister?.isRegisterSuccessfulOrTaken.includes('Successful'))
        {

            return{
                pTag:
                    <p className='succesfullRegistration' onClick={() => navigateService.navigate('/login')}>{checkRegister.isRegisterSuccessfulOrTaken}</p>
            }

        }
        else if(checkRegister?.isRegisterSuccessfulOrTaken.includes('taken'))
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
        afterRegistration,

        checkRegister
    }

}