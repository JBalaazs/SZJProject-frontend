import { useLocation } from "react-router-dom";
import { useNavigateService } from "../service/navigateService"
import { useEffect, useState } from "react";
import { useMenuBarService } from "../service/menuBarService";
import { useMatch } from "react-router-dom";
import { GET } from "../endpoints/GET";

const MenuBar = () => {

    /*Service:*/

    const navigateService = useNavigateService();
    const location = useLocation();
    const menuBarService = useMenuBarService();

    /*endpoints:*/

    const endpoints_GET = GET();

    /*useState:*/

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [hidden, setHidden] = useState(false);

    /*useEffect:*/

    useEffect(() => {

        endpoints_GET.getDetails();
        endpoints_GET.getCartItems();
        
    }, []);

    useEffect(() => {

        const handleScroll = () => {

            const currentScrollTop = document.documentElement.scrollTop;

            if(currentScrollTop > 100)
            {
    
                setHidden(true);
    
            }
            else
            {
    
                setHidden(false);
    
            }

        }

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll',  handleScroll);

    }, [])

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

    const toggleDropDown = () => {

        setIsDropdownOpen(!isDropdownOpen);

    }

    const NumberOfCartItems = (): number => {

        if(endpoints_GET.cartItems?.cartItems)
        {

            if(endpoints_GET.cartItems.cartItems.length > 0)
            {

                return endpoints_GET.cartItems.cartItems.length;

            }

        }

        return 0;

    }

    /*Return:*/

    return(
        <div className={`menuBar ${hidden ? 'hidden' : ''}`}>

            <button onClick={() => navigateService.navigate('/')} className="szjTitle">SZJ</button>
            <h4 className="menuToggle" onClick={toggleMenu}>☰</h4>

            <div className={`menuItems ${isMenuOpen ? 'open' : ''}`}>

                <button onClick={() => navigateService.navigate(getBackRoute())} className="menuButton">Back</button>
                <button onClick={() => navigateService.navigate('/webshop')} className="menuButton">Webshop</button>
                <button onClick={() => navigateService.navigate('/addproduct')} style={{display: `${menuBarService.loginOrLogout().cssCode}`}} className="menuButton">Add product</button>
                <button onClick={() => navigateService.navigate('/cart')} style={{display: `${menuBarService.loginOrLogout().cssCode}`}} className="menuButton">Cart ({NumberOfCartItems()})</button>
                <button onClick={() => navigateService.navigate('/login')} style={{display: `${menuBarService.loginOrLogout().isLogin}`}} className="menuButton">Login</button>

            </div>

            <button className="buyAndSellTitle" style={{display: `${menuBarService.loginOrLogout().isLogin}`}}>Buy & Sell With Us!</button>

            <div className="profile" onClick={toggleDropDown} style={{display: `${menuBarService.loginOrLogout().cssCode}`}}></div>

                <div className={`toggleDropDown ${isDropdownOpen ? 'show' : ''}`}>
                
                    <p>{endpoints_GET.detail?.balance.toFixed(2)} $</p>
                    <button className="toggleDropDownButton" onClick={() => navigateService.navigate('/client')}>Profile</button>
                    <button className="toggleDropDownButton" onClick={menuBarService.loginOrLogout().service}>Logout</button>
                
                </div>

        </div>
    )

}

export default MenuBar;