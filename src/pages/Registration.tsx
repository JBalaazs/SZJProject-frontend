import '../design/style.css';
import { useRegistrationService } from '../service/registrationService';
import MenuBar from "../components/menuBar";

export default function Registration () {

    /*Service:*/

    const registrationService = useRegistrationService();

    /*Return:*/

    return(

        <div className='RegistrationDesign'>

            <div className='outsideDIV'>
            
                <MenuBar />

                <div className='insideDIV_Registration'>

                    <h2 className='title_Registration'>Registration</h2>

                    <input type="text" name='username' className="inputStyle_Registration" placeholder="Username" onChange={registrationService.handleChange}/>
                    <input type="password" name='password' className="inputStyle_Registration" placeholder="Password" onChange={registrationService.handleChange}/>

                    <button className='btn btn-light registrationButton' disabled={(!registrationService.checkRegister?.atLeast5Characters || !registrationService.checkRegister?.atLeast1UppercaseLetter) || !registrationService.checkRegister?.correctUsername} onClick={registrationService.registration}>Registration</button>

                    <div className="conditionDIV">
                        
                        <p>{registrationService.checkRegister?.atLeast5Characters ? '✔' : '✘'} Password must be at least 5 characters long.</p>
                        <p>{registrationService.checkRegister?.atLeast1UppercaseLetter ? '✔' : '✘'} Password must be contain at least one uppercase letter.</p>
                        <p>{registrationService.checkRegister?.correctUsername ? '✔' : '✘'} Correct username (3-10 characters).</p>

                        {registrationService.afterRegistration().pTag}
                        
                    </div>

                </div>
            
            </div>
        
        </div>

    )

}