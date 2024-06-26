import 'bootstrap/dist/css/bootstrap.css';
import '../design/style.css';
import { useNavigateService } from '../service/navigateService';

export default function Home () {

    /*Service:*/

    const navigateService = useNavigateService();

    /*Return:*/

    return (
        <div className='HomeDesign'>
            <div className='outsideDIV'>
            
                <div className='insideDIV_Home'>

                    <button className='btn btn-primary homeButton' onClick={() => navigateService.navigate('/login')}>Login</button>
                    <button className='btn btn-primary homeButton' onClick={() => navigateService.navigate('/registration')}>Registration</button>
                    <button className='btn btn-primary homeButton' onClick={() => navigateService.navigate('/webshop')}>Webshop</button>

                </div>
            
            </div>
        </div>
    )

}