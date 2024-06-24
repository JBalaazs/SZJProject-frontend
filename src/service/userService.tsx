import { useState, useEffect } from "react";

interface UserType {

    id: number,
    name: string,
    password: string

}

export function useUserService () {

    /*useState:*/

    const [userData, setUserData] = useState<UserType[] | null>(null);

    /*useEffect:*/

    useEffect(() => {
    
        fetch('http://localhost:8081/api/user')
            .then(res => res.json())
            .then(data => setUserData(data))
        
    }, []);

    /*Function:*/

    const login = (usernameText: string, passwordText: string): boolean => {

        const findPair = userData?.find(u => u.name == usernameText && u.password == passwordText);

        if(findPair)
        {

            localStorage.setItem('id', findPair.id.toString());
            return true;

        }

        return false;

    }

    /*Return:*/

    return {
        login
    };

}