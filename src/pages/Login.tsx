import 'bootstrap/dist/css/bootstrap.css';
import '../design/style.css';
import { useLoginService } from '../service/loginService';
import { useNavigateService } from '../service/navigateService';

export default function Login () {

    /*Navigate:*/

    const navigateService = useNavigateService();

    /*Service:*/

    const loginService = useLoginService();

    /*Return:*/

    return(
        <div className='LoginDesign'>
            <div className='outsideDIV'>
                
                <button className="btn btn-primary backButton" onClick={() => navigateService.navigate('/')}>Back</button>

                <div className='insideDIV_Login'>
        
                    <h2 className='title_Login'>Login</h2>
                    <input type='text' placeholder='Username' className='inputStyle_Login' onChange={loginService.onChange_Username} />
                    <input type='password' placeholder='Password' className='inputStyle_Login' onChange={loginService.onChange_Password} />
                    <button className='btn btn-primary loginButton' onClick={async () => {
                        await loginService.loginUser(loginService.usernameText, loginService.passwordText)
                    }}>Login</button>

                    {
                        loginService.errorMessage.includes('Successful') ? (
                            <p className='successText'>{loginService.errorMessage}</p>
                        ) : (
                            <p className='errorText'>{loginService.errorMessage}</p>
                        )
                    }

                </div>

            </div>
        </div>
    );

}