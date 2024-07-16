import { useLocation } from "react-router-dom";
import { useNavigateService } from "../service/navigateService"
import { useState } from "react";
import { useLogOutService } from "../service/logOutService";
import { useMenuBarService } from "../service/menuBarService";
import { useMatch } from "react-router-dom";

const MenuBar = () => {

    /*Service:*/

    const navigateService = useNavigateService();
    const location = useLocation();
    const logOutService = useLogOutService();
    const menuBarService = useMenuBarService();

    /*useState:*/

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    /*useMatch:*/

    const matchBuyIt = useMatch('/buyit/:productId');
    const matchModify = useMatch('/modify/:productId');

    /*Function:*/

    const getBackRoute = () => {

        switch(location.pathname) {

            case '/client':
                return '/';
            
            case '/webshop':
                return '/';
            
            case '/addproduct':
                return '/webshop';

            case '/cart':
                return '/webshop';

            default:
                if(matchBuyIt || matchModify)
                {
                    return '/webshop';
                }
                return '/';

        }

    }

    const toggleMenu = () => {

        setIsMenuOpen(!isMenuOpen);

    }

    /*Return:*/

    return(
        <div className="menuBar">
            <h4 onClick={() => navigateService.navigate('/')}>SZJ</h4>
            <h4 className="menuToggle" onClick={toggleMenu}>☰</h4>

            <div className={`menuItems ${isMenuOpen ? 'open' : ''}`}>
                <button onClick={() => navigateService.navigate(getBackRoute())}>Back</button>
                <button onClick={() => navigateService.navigate('/webshop')}>Webshop</button>
                <button onClick={() => navigateService.navigate('/client')} style={{display: `${menuBarService.loginOrLogout().cssCode}`}}>Client Site</button>
                <button onClick={() => navigateService.navigate('/addproduct')} style={{display: `${menuBarService.loginOrLogout().cssCode}`}}>Add product</button>
                <button onClick={() => navigateService.navigate('/cart')} style={{display: `${menuBarService.loginOrLogout().cssCode}`}}>Cart</button>

                <button onClick={menuBarService.loginOrLogout().service}>
                    {menuBarService.loginOrLogout().title}</button>

            </div>
        </div>
    )

}

export default MenuBar;