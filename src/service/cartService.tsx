import { useEffect, useState } from "react";
import { useWebshopService } from "./webshopService";

interface cartData {

    cartId: number,
    cartItems: {
        productId: number,
        quantity: number
    }[]

}

export function useCartService () {

    /*Service:*/

    const webshopService = useWebshopService();

    /*useState:*/

    const [cartItems, setCartItems] = useState<cartData | null>(null);

    /*Function:*/

    function parseJwt(token: string): {userId: number | null, username: string } | null {
        
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            
            const payload = JSON.parse(jsonPayload);
    
            const username = payload.sub;

            return{

                userId: payload[username].UserId,
                username: username

            };
        
    }

    const cartList = () => {

        let totalPrice = 0;

        const ListOfCart = cartItems?.cartItems.map(x => {

            const findPairs = webshopService.products?.find(p => p.productId == x.productId);

            if(findPairs)
            {

                totalPrice += (findPairs.price * x.quantity);

                return(
                    <div className="productList">
    
                        <h3>{findPairs.productName} <span style={{fontSize: '20px'}}>({findPairs.price * x.quantity} <span className="buyitDollarSign">$</span> - {x.quantity} pcs)</span></h3>
                        <button className="btn btn-danger modifyButton">Törlés</button>
            
                    </div>
                );

            }
        })

        return(
            <>

                {ListOfCart}
                <div className="productPrice_Cart">

                    <h3>{totalPrice} <span className="buyitDollarSign">$</span></h3>
                    <button className="btn btn-success buyButton" style={{fontWeight: 'bold'}}>Vásárlás</button>

                </div>

            </>
        )

    }

    /*useEffect:*/

    useEffect(() => {

        const token = localStorage.getItem('token');

        if(token)
        {

            fetch(`${process.env.REACT_APP_API_URL}/carts?userId=${parseJwt(token)?.userId}`)
                .then(res => res.json())
                .then(data => setCartItems(data.data))
                
        }

    }, [])

    /*Return:*/

    return {
        cartList
    }  

}