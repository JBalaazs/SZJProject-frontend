import '../design/style.css';
import { useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigateService } from "./navigateService";
import { POST } from "../endpoints/POST";
import { GET } from "../endpoints/GET";
import { extendedProductType } from "../interfaces/InterfaceCollection";

export function useBuyItService () {

    /*useState:*/

    const [pieceOfProduct, setPieceOfProduct] = useState(0);
    const [error, setError] = useState('');

    /*onChange:*/

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

        setPieceOfProduct(Number(event.target.value));

    }

    /*endpoints:*/

    const endpoints_POST = POST();
    const endpoints_GET = GET();

    /*Service:*/

    const navigateService = useNavigateService();

    /*selectedId from URL:*/

    const { productId } = useParams();

    /*useEffect:*/

    useEffect(() => {

        endpoints_GET.getProducts();
        endpoints_GET.getCartItems();

    }, [])

    /*Function:*/

    const findProductById = () : extendedProductType | null => {

        const findPair = endpoints_GET.products?.find(p => p.productId == Number(productId));

        if(findPair)
        {
            return findPair;
        }

        return null;

    }

    const totalPrice = () : number | null => {

        if(findProductById)
        {

            let total = Number(findProductById()?.price) * pieceOfProduct;

            return total;

        }

        return null;

    }

    const addToCart = () => {

        let isStock = false;

        if(!endpoints_GET.cartItems?.cartItems.length) /*After clear there are not elements.*/
        {

            isStock = true;
            
        }

        endpoints_GET.cartItems?.cartItems.map(x => {

            const findExist = endpoints_GET.products?.find(p => x.productId == Number(productId));
            const findPair =  endpoints_GET.products?.find(p => findExist && p.stock >= (x.quantity + pieceOfProduct));

            if(!findExist)
            {

                isStock = true;

            }else if(findPair)
            {

                isStock = true;

            }else
            {

                isStock = false;
                setError('All of these are in your cart.');

            }

        })

        if(pieceOfProduct > 0 && isStock)
        {

            endpoints_POST.addToCart(Number(productId), pieceOfProduct);

            navigateService.navigate('/webshop');

            window.location.reload();

        }

    }

    const buyItButton_Input = () => {

        if(pieceOfProduct > 0 && Number(findProductById()?.stock) >= pieceOfProduct)
        {

            return{

                buttonStyle:
                    "primary",

                disabled:
                    false,

                error:
                    error ? (
                        <p className="errorText">{error}</p>
                    ) : null

            }

        }
        else
        {

            return{

                buttonStyle:
                    "danger",

                disabled:
                    true

            }

        }

    }

    /*Return:*/

    return{
        handleChange,
        totalPrice,
        findProductById,
        addToCart,
        buyItButton_Input,
        pieceOfProduct,
        error
    }

}