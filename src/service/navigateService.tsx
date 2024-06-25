import { useNavigate } from 'react-router-dom';

export function useNavigateService () {

    const navigate = useNavigate();

    return{
        navigate
    }

}