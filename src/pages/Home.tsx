import 'bootstrap/dist/css/bootstrap.css';
import '../design/style.css';
import { useNavigateService } from '../service/navigateService';
import { useLogOutService } from '../service/logOutService';

export default function Home () {

    /*Service:*/

    const navigateService = useNavigateService();
    const logOutService = useLogOutService();

    /*Return:*/

    return (
        <div className='HomeDesign'>
            <div className='outsideDIV'>
            
                <div className='insideDIV_Home'>

                    <button 
                        className='btn btn-primary homeButton'
                        onClick={() => localStorage.getItem('token') ? navigateService.navigate('/client') : navigateService.navigate('/login')}>
                        {localStorage.getItem('token') ? 'Client Site' : 'Login'}</button>

                    {

                        localStorage.getItem('token') ? (

                            <></>

                        ) : (

                            <button
                            className='btn btn-primary homeButton'
                            onClick={() => navigateService.navigate('/registration')}>
                            Registration</button>

                        )

                    }
                

                    <button
                        className='btn btn-primary homeButton'
                        onClick={() => navigateService.navigate('/webshop')}>
                        Webshop</button>

                    <button
                        className='btn btn-primary homeButton'
                        onClick={logOutService.logout}
                        disabled={localStorage.getItem('token') ? false : true}>
                        Logout</button>

                </div>
            
            </div>
        </div>
    )

}