import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productStruct, useWebshopService } from "./webshopService";
import { useNavigateService } from "./navigateService";

export function useModifyService () {

    /*Service:*/

    const webshopService = useWebshopService();
    const navigateService = useNavigateService();

    /*selectedId from URL:*/

    const { productId } = useParams();

    /*useState:*/

    const [modifyData, setModifyData] = useState({

        productId: Number(productId),
        productName: '',
        productDescription: '',
        price: 0
        
    });

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

        }

    }, [productId, webshopService.products]);

    /*onChange:*/

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

        const {name, value} = event.target;

        setModifyData(prevModify => ({

            ...prevModify,
            [name]: name == 'price' ? Number(value) : value

        }));

        if(name == 'productDescription')
        {

            setCharacterCount(value.length);

        }

    }

    /*Function:*/

    const productDatasThatWillBeModify = () : productStruct | null => {

        const findPair = webshopService.products?.find(p => p.productId == Number(productId));

        if(findPair)
        {

            return findPair;

        }

        return null;

    }

    const addModifyProduct = () => {

        const token = localStorage.getItem('token');

        fetch(`${process.env.REACT_APP_API_URL}/products`, {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(modifyData)

        })
        .catch(error => {
            console.error('Error:', error);
        });

        navigateService.navigate('/webshop');

    }

    const deleteProduct = () => {

        const token = localStorage.getItem('token');

        fetch(`${process.env.REACT_APP_API_URL}/products?productId=${productId}`, {

            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }

        })
        .catch(error => {
            console.error('Error:', error);
        });

        navigateService.navigate('/webshop');

    }

    /*Return:*/

    return{
        handleChange,
        characterCount,
        addModifyProduct,
        productDatasThatWillBeModify,
        deleteProduct
    }
    
}