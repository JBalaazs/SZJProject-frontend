import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import { useNavigate } from 'react-router-dom';

export default function Home () {

    /*Navigate:*/

    const navigate = useNavigate();

    /*Return:*/

    return (
        <div className='outsideDIV'>
        
            <div className='insideDIV insideDIV_PLUS'>

                <button className='btn btn-primary menuButton' onClick={() => navigate('/login')}>Login</button>
                <button className='btn btn-primary menuButton' onClick={() => navigate('/registration')}>Registration</button>

            </div>
        
        </div>
    )

}