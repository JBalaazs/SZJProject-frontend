import { useLogOutService } from "./logOutService";
import { useNavigateService } from "./navigateService";

export function useMenuBarService () {

    /*Service:*/

    const logOutService = useLogOutService();
    const navigateService = useNavigateService();

    /*Function:*/

    const isDisabled = () : boolean => {

        if(localStorage.getItem('token'))
        {

            return false;

        }

        return true;

    }

    const loginOrLogout = () => {

        if(localStorage.getItem('token'))
        {

            return{
                service: logOutService.logout,
                isLogin: 'none',
            }

        }
        else
        {

            return{
                service: () => navigateService.navigate('/login'),
                title: 'Login',
                cssCode: 'none'
            }

        }

    }

    /*Return:*/

    return{
        isDisabled,
        loginOrLogout,
    }

}