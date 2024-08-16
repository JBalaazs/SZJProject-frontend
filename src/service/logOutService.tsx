import { POST } from "../endpoints/POST";
import { useNavigateService } from "./navigateService";

export function useLogOutService () {

    /*Service:*/

    const navigateService = useNavigateService();

    /*endpoints:*/

    const endpoints_POST = POST();

    /*Function:*/

    const logout = () => {

        endpoints_POST.logOut();

        navigateService.navigate('/');

    }

    /*Return:*/

    return{
        logout
    }
    
}