import { ChangeEvent, useState } from "react";
import { useNavigateService } from "./navigateService";
import { authType } from "../interfaces/InterfaceCollection";
import { POST } from "../endpoints/POST";

export function useLoginService () {

    /*Service:*/

    const navigateService = useNavigateService();

    /*useState:*/

    const [errorMessage, setErrorMessage] = useState('');

    const [loginData, setLoginData] = useState<authType | null>(null);

    /*endpoints:*/

    const endpoints_POST = POST();

    /*onChange:*/

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

        const {name, value} = event.target;

        setLoginData(prevLogin => ({

            ...prevLogin,
            [name]: value 

        } as authType));

    }

    /*Function:*/

    async function loginUser(username: string, password: string) {
        
        if(username && password)
        {

            try{

                if(loginData)
                {

                    const response = await endpoints_POST.login(loginData);
        
                    if(!response.ok)
                    {
                        throw new Error('Failed to login: ' + response.statusText);
                    }
        
                    const returnData = await response.json();

                    
                    localStorage.setItem('token', returnData.data);

                }

                setErrorMessage('Successful login.');

                navigateService.navigate('/');
    
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