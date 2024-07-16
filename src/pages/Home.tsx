import 'bootstrap/dist/css/bootstrap.css';
import '../design/style.css';
import { useNavigateService } from '../service/navigateService';
import { useLogOutService } from '../service/logOutService';
import { useMenuBarService } from '../service/menuBarService';
import { useHomeService } from '../service/homeService';

export default function Home () {

    /*Service:*/

    const navigateService = useNavigateService();
    const logOutService = useLogOutService();
    const menuBarService = useMenuBarService();
    const homeService = useHomeService();

    /*Return:*/

    return (
        <div className='HomeDesign'>
            <div className='outsideDIV'>
            
                <div className='insideDIV_Home'>

                    <button 
                        className='btn btn-primary homeButton'
                        onClick={homeService.LoginOrClientSite().nextTo}>
                        {homeService.LoginOrClientSite().title}</button>

                    {

                        homeService.LoginOrClientSite().registrationButton

                    }
                

                    <button
                        className='btn btn-primary homeButton'
                        onClick={() => navigateService.navigate('/webshop')}>
                        Webshop</button>

                    <button
                        className='btn btn-primary homeButton'
                        onClick={logOutService.logout}
                        style={{display: `${menuBarService.loginOrLogout().cssCode}`}}>
                        Logout</button>

                </div>
            
            </div>
        </div>
    )

}