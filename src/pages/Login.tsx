import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import { useState } from 'react';
import { useUserService } from '../service/userService';
import { useNavigateService } from '../service/navigateService';

export default function Login () {

    /*useState:*/

    const [usernameText, setUsernameText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    /*Service:*/

    const userData = useUserService();
    const navigateService = useNavigateService();


    /*onChange:*/

    const onChange_Username : React.ChangeEventHandler<HTMLInputElement> = (event) => {

        setUsernameText(event.target.value);

    }

    const onChange_Password : React.ChangeEventHandler<HTMLInputElement> = (event) => {

        setPasswordText(event.target.value);

    }

    /*Function:*/

    const handleLogin = () => {

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

    /*Return:*/

    return(
        <>
            <div className='outsideDIV'>
                
                <button className="btn btn-primary backButton" onClick={() => navigateService.navigate('/')}>Back</button>

                <div className='insideDIV'>
        
                    <h2 className='title'>Login</h2>
                    <input type='text' placeholder='Username' className='inputStyle' onChange={onChange_Username} />
                    <input type='password' placeholder='Password' className='inputStyle' onChange={onChange_Password} />
                    <button className='btn btn-primary menuButton' onClick={handleLogin}>Login</button>

                    {
                        errorMessage.includes('Successful') ? (
                            <p className='successText'>{errorMessage}</p>
                        ) : (
                            <p className='errorText'>{errorMessage}</p>
                        )
                    }

                </div>

            </div>
        </>
    );

}