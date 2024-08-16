import { useNavigateService } from "./navigateService"
export function useHomeService () {

    /*Service:*/

    const navigateService = useNavigateService();

    /*Function:*/

    const LoginOrClientSite = () => {

        if(localStorage.getItem('token'))
        {

            return{

                nextTo: () => navigateService.navigate('/client'),
                title: 'Client Site'

            }

        }
        else
        {

            return{

                nextTo: () => navigateService.navigate('/login'),
                title: 'Login',
                registrationButton:  
                    <button
                        className='btn btn-primary homeButton'
                        onClick={() => navigateService.navigate('/registration')}>
                        Registration
                    </button>

            }

        }

    }

    /*Return:*/

    return{
        LoginOrClientSite
    }

}