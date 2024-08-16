import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigateService } from "./navigateService";
import { modifyProductType } from "../interfaces/InterfaceCollection";
import { PUT } from "../endpoints/PUT";
import { DELETE } from "../endpoints/DELETE";
import { GET } from "../endpoints/GET";
import { extendedProductType } from "../interfaces/InterfaceCollection";

export function useModifyService () {

    /*Service:*/

    const navigateService = useNavigateService();

    /*endpoints:*/

    const endpoints_PUT = PUT();
    const endpoints_DELETE = DELETE();
    const endpoints_GET = GET();

    /*selectedId from URL:*/

    const { productId } = useParams();

    /*useState:*/

    const [modifyData, setModifyData] = useState<modifyProductType | null>(null);

    const [characterCount, setCharacterCount] = useState(0);

    /*useEffect:*/

    useEffect(() => {

        const foundProduct = productDatasThatWillBeModify();

        if(foundProduct)
        {

            setModifyData({

                productId: Number(productId),
                productName: foundProduct.productName,
                productDescription: foundProduct.description,
                price: foundProduct.price,

            });

            if(modifyData)
            {

                setCharacterCount(modifyData?.productDescription.length);

            }

        }

    }, [productId,  endpoints_GET.products]);

    /*onChange:*/

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

        const {name, value} = event.target;

        setModifyData(prevModify => ({

            ...prevModify,
            [name]: name == 'price' ? Number(value) : value

        } as modifyProductType));

        if(name == 'productDescription')
        {

            setCharacterCount(value.length);

        }

    }

    /*Function:*/

    const productDatasThatWillBeModify = () : extendedProductType | null => {

        const findPair = endpoints_GET.products?.find(p => p.productId == Number(productId));

        if(findPair)
        {

            return findPair;

        }

        return null;

    }

    const addModifyProduct = () => {

        if(modifyData)
        {

            endpoints_PUT.addModifyProduct(modifyData);

        }

        navigateService.navigate('/webshop');

    }

    const deleteProduct = () => {

        endpoints_DELETE.deleteProduct(Number(productId));
        
        navigateService.navigate('/webshop');

    }

    /*Return:*/

    return{
        handleChange,
        addModifyProduct,
        productDatasThatWillBeModify,
        deleteProduct,

        characterCount
    }
    
}