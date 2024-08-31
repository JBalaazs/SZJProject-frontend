import { useEffect, useState } from "react";
import { useNavigateService } from "./navigateService";
import { useMenuBarService } from "./menuBarService";
import { extendedProductType } from "../interfaces/InterfaceCollection";
import { GET } from "../endpoints/GET";
import { ParseJWT } from "../endpoints/ParseJWT";

export function useWebshopService () {

    /*Service:*/

    const navigateService = useNavigateService();
    const menuBarService = useMenuBarService();

    /*ParseJWT:*/

    const decodeJWT = ParseJWT();

    /*endpoints:*/

    const endpoints_GET = GET();

    /*useEffect:*/

    useEffect(() => {

        endpoints_GET.getProducts();

    }, []);

    /*Function:*/

    const getUsername = ()  => {

        const token = localStorage.getItem('token');
        const username = token ? decodeJWT.parseJwt(token)?.username : null;

        const findPair = endpoints_GET.products?.some(p => p.seller == username);

        if(findPair)
        {

            return username;

        }

        return username;

    }

    const webshopButton = (product: extendedProductType) => {        

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
        getUsername,
        webshopButton,

        endpoints_GET,
        
    }

}