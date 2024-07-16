import { ChangeEvent, useState } from "react";
import { useNavigateService } from "./navigateService";

export function useAddProductService () {

    /*Service:*/

    const navigateService = useNavigateService();

    /*useState:*/

    const [characterCount, setCharacterCount] = useState(0);

    const [productDatas, setProductDatas] = useState({

        productName: '',
        productDescription: '',
        price: 0,
        stock: 0,
        productCondition: 'New'

    });

    /*onChange:*/

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const {name, value} = event.target;

        setProductDatas(prevProduct => ({

            ...prevProduct,
            [name]: name == 'price' || name == 'stock' ? Number(value) : value

        }));

        if(name == 'productDescription') 
        {

            setCharacterCount(value.length);

        }

    }

    /*Function:*/

    const addNewProduct = () => {

        const token = localStorage.getItem('token');

        fetch(`${process.env.REACT_APP_API_URL}/products`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(productDatas)

        })
        .catch(error => {
            console.error('Error:', error);
        });

        navigateService.navigate('/webshop');
        window.location.reload();

    }

    const textByCharacterCount = (numberOfCharacters: number) => {

        if(numberOfCharacters < 100)
        {

            return{

                pTag:
                    <p style={{color: "green"}}>{numberOfCharacters}/100</p>

            }

        }
        else
        {

            return{

                pTag:
                    <p style={{color: "red"}}>{numberOfCharacters}/100</p>

            }

        }

    }

    /*Return:*/

    return{
        handleChange,
        addNewProduct,
        textByCharacterCount,
        characterCount
    }

}