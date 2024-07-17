import { productStruct, useWebshopService } from "./webshopService";
import { useParams } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import '../design/style.css';
import { useNavigateService } from "./navigateService";
import { useCartService } from "./cartService";

export function useBuyItService () {

    /*useState:*/

    const [pieceOfProduct, setPieceOfProduct] = useState(0);

    /*onChange:*/

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

        setPieceOfProduct(Number(event.target.value));

    }

    /*Service:*/

    const webshopService = useWebshopService();
    const navigateService = useNavigateService();
    const cartService = useCartService();

    /*selectedId from URL:*/

    const { productId } = useParams();

    /*Function:*/

    const findPairFunction = () : productStruct | null => {

        const findPair = webshopService.products?.find(p => p.productId == Number(productId));

        if(findPair)
        {
            return findPair;
        }

        return null;

    }

    const collectDataByItemId = () => {

        const findPair = webshopService.products?.find(p => p.productId == Number(productId));

        if(findPair)
        {

            return (
            
                <>

                    <p className="buyitTitle">{findPairFunction()?.productName}</p>

                    <p className="buyitAvailable">({findPairFunction()?.stock} pcs left)</p>

                    <p className="buyitAbout">About the product:</p>

                    <p className="buyitDescription">{findPairFunction()?.description}</p>

                    <p className="buyitPriceTitle">Price:</p>

                    <p className="buyitPrice">{findPairFunction()?.price.toFixed(2)} <span className="buyitDollarSign">$</span> / pcs</p>

                </>

            );

        }

    }

    const totalPrice = () : number | null => {

        if(findPairFunction && pieceOfProduct <= Number(findPairFunction()?.stock))
        {

            let total = Number(findPairFunction()?.price) * pieceOfProduct;

            return total;

        }
        else if(findPairFunction)
        {

            let total = Number(findPairFunction()?.price) * Number(findPairFunction()?.stock);

            return total;

        }

        return null;

    }

    const addToCart = () => {

        let isStock = false;

        cartService.cartItems?.cartItems.map(x => {

            const findExist = webshopService.products?.find(p => x.productId == Number(productId));
            const findPair = webshopService.products?.find(p => x.productId == Number(productId) && p.stock > x.quantity);

            if(!findExist)
            {

                isStock = true;

            }else if(findPair)
            {

                isStock = true;

            }
            else
            {

                isStock = false;

            }

        })

        if(pieceOfProduct > 0 && isStock)
        {

            const token = localStorage.getItem('token');

            let quantity = pieceOfProduct;

            fetch(`${process.env.REACT_APP_API_URL}/carts/add`, {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({productId, quantity})

            })

            navigateService.navigate('/webshop');

        }

    }

    const buyItButton_Input = () => {

        if(pieceOfProduct > 0)
        {

            return{

                buttonTag:
                    <button 
                        className="btn btn-primary buyitButton"
                        disabled={false}
                        onClick={addToCart}>
                        Add To Cart</button>

            }

        }
        else
        {

            return{

                buttonTag:
                    <button 
                        className="btn btn-danger buyitButton"
                        disabled={true}
                        onClick={addToCart}>
                        Add To Cart</button>

            }

        }

    }

    /*Return:*/

    return{
        collectDataByItemId,
        handleChange,
        totalPrice,
        findPairFunction,
        addToCart,
        pieceOfProduct,
        buyItButton_Input
    }

}