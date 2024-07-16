import { useEffect, useState } from "react";
import { useNavigateService } from "./navigateService";
import { useMenuBarService } from "./menuBarService";

export interface productStruct{

    productId: number,
    available: boolean,
    creationDate: Date,
    description: string,
    price: number,
    productCondition: string,
    productName: string,
    seller: string,
    stock: number

}

export function useWebshopService () {

    /*Service:*/

    const navigateService = useNavigateService();
    const menuBarService = useMenuBarService();

    /*useState:*/

    const [products, setProducts] = useState<productStruct[] | null>(null);

    /*useEffect:*/

    useEffect(() => {

        fetch(`${process.env.REACT_APP_API_URL}/products`)
            .then(res => res.json())
            .then(data => setProducts(data))

    }, []);

    /*Function:*/

    function parseJwt (token : string) 
    {

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);

    }

    const getUsername = ()  => {

        const token = localStorage.getItem('token');
        const userData = token ? parseJwt(token) : null;
        const username = userData ? userData.sub : 'Unknown user';

        const findPair = products?.some(p => p.seller == username);

        if(findPair)
        {

            return username;

        }

        return username;

    }

    const webshopButton = (product: productStruct) => {        

            if(product.seller == getUsername())
            {

                return(

                    
                        <button 
                            className='btn btn-primary modifyButton'
                            onClick={() => navigateService.navigate(`/modify/${product.productId}`)}
                            disabled={menuBarService.isDisabled()}>
                            Modify</button>

                )

            }
            else
            {

                return(

                    
                        <button 
                            className='btn btn-primary buyButton' 
                            onClick={() => navigateService.navigate(`/buyit/${product.productId}`)}
                            disabled={menuBarService.isDisabled()}>
                            Buy It</button>
                    
                )

            }        

    }

    /*Return:*/

    return{
        products,
        getUsername,
        webshopButton
    }

}