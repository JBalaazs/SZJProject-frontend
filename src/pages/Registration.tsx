import './style.css';
import { useNavigateService } from '../service/navigateService';
import { useRegistrationService } from '../service/registrationService';

export default function Registration () {

    /*Service:*/

    const navigateService = useNavigateService();
    const registrationService = useRegistrationService();

    /*Return:*/

    return(



            <div className='outsideDIV'>
            
                <button className="btn btn-primary backButton" onClick={() => navigateService.navigate('/')}>Back</button>

                <div className='insideDIV'>

                    <h2 className='title'>Registration</h2>

                    <input type="text" className="inputStyle" placeholder="Username" onChange={registrationService.onChange_username}/>
                    <input type="password" className="inputStyle" placeholder="Password" onChange={registrationService.onChange_password}/>

                    <button className='btn btn-primary menuButton' disabled={!registrationService.atLeast5Characters || !registrationService.atLeast1UppercaseLetter}>Registration</button>

                    <div className="conditionDIV">
                        <p>{registrationService.atLeast5Characters ? '✔' : '✘'} Password must be at least 5 characters long.</p>
                        <p>{registrationService.atLeast1UppercaseLetter ? '✔' : '✘'} Password must be contain at least one uppercase letter.</p>
                        <p>{registrationService.atLeast5Characters && registrationService.atLeast1UppercaseLetter ? '✔' : '✘'} Correct password.</p>
                    </div>

                </div>
            
            </div>


    )

}