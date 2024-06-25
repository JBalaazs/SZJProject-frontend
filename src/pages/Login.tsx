import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import { useLoginService } from '../service/loginService';
import { useNavigateService } from '../service/navigateService';

export default function Login () {

    /*Navigate:*/

    const navigateService = useNavigateService();

    /*Service:*/

    const loginService = useLoginService();

    /*Return:*/

    return(
        <>
            <div className='outsideDIV'>
                
                <button className="btn btn-primary backButton" onClick={() => navigateService.navigate('/')}>Back</button>

                <div className='insideDIV'>
        
                    <h2 className='title'>Login</h2>
                    <input type='text' placeholder='Username' className='inputStyle' onChange={loginService.onChange_Username} />
                    <input type='password' placeholder='Password' className='inputStyle' onChange={loginService.onChange_Password} />
                    <button className='btn btn-primary menuButton' onClick={() => loginService.handleLogin(loginService.usernameText, loginService.passwordText)}>Login</button>

                    {
                        loginService.errorMessage.includes('Successful') ? (
                            <p className='successText'>{loginService.errorMessage}</p>
                        ) : (
                            <p className='errorText'>{loginService.errorMessage}</p>
                        )
                    }

                </div>

            </div>
        </>
    );

}