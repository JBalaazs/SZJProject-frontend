import { useNavigateService } from "./navigateService";

export function useLogOutService () {

    /*Service:*/

    const navigateService = useNavigateService();

    /*Function:*/

    const logout = () => {

        const token = localStorage.getItem('token');

        fetch(`http://localhost:8081/api/user/auth/logout`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({})

        });

        localStorage.removeItem('token');

        navigateService.navigate('/');

    }

    /*Return:*/

    return{
        logout
    }
    
}