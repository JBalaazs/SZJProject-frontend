import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import { useNavigateService } from '../service/navigateService';

export default function Home () {

    /*Service:*/

    const navigateService = useNavigateService();

    /*Return:*/

    return (
        <div className='outsideDIV'>
        
            <div className='insideDIV insideDIV_PLUS'>

                <button className='btn btn-primary menuButton' onClick={() => navigateService.navigate('/login')}>Login</button>
                <button className='btn btn-primary menuButton' onClick={() => navigateService.navigate('/registration')}>Registration</button>

            </div>
        
        </div>
    )

}