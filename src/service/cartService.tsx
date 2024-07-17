import { useEffect, useState, ChangeEvent } from "react";
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
    const [popUp, setPopUp] = useState(false);
    const [productId, setProductId] = useState(0);
    const [deletePcs, setDeletePcs] = useState(0);

    /*onChange:*/

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

        const {name, value} = event.target;

        if(name == "delete")
        {

            setDeletePcs(Number(value));
            
        }

    }

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

    const deleteFromCartById = (productId: number) => {

        const token = localStorage.getItem('token');
        const quantity = deletePcs;

        fetch(`${process.env.REACT_APP_API_URL}/carts/remove`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({productId, quantity})

        })

        window.location.reload();

    }

    const showPopUp = (productId: number) => {

        setPopUp(!popUp);

        setProductId(productId);

        setDeletePcs(0);

    }

    const cartList = () => {

        let totalPrice = 0;

        const findPairForCartDatas = cartItems?.cartItems.find(c => c.productId == productId);

        const ListOfCart = cartItems?.cartItems.map(x => {

            const findPairs = webshopService.products?.find(p => p.productId == x.productId);

            if(findPairs)
            {

                totalPrice += (findPairs.price * x.quantity);

                return(
                    <div className="productList">
    
                        <h3>
                            {findPairs.productName} 
                            <span style={{fontSize: '20px'}}> ({(findPairs.price * x.quantity).toFixed(2)} 
                            <span className="buyitDollarSign">$</span> 
                            - {x.quantity} pcs)</span>
                        </h3>

                        <button 
                            className="btn btn-danger modifyButton"
                            onClick={() =>showPopUp(x.productId)}>Delete</button>

                    </div>
                );

            }
        })

        return(
            <>

                {ListOfCart}
                <div className="productPrice_Cart">

                    <h3>{totalPrice.toFixed(2)} <span className="buyitDollarSign">$</span></h3>
                    <button className="btn btn-success buyButton" style={{fontWeight: 'bold'}}>Buy</button>

                </div>

                <div className={`popUp ${popUp ? 'open' : ''}`}>

                    <div className="deletePanel">

                        <h1 className="deleteTitle">DELETE</h1>
                        <p className="deletePcs">({findPairForCartDatas?.quantity}pcs)</p>

                        <button 
                            className="btn btn-danger X_Button"
                            onClick={() => setPopUp(!popUp)}>X</button>

                        <label htmlFor="delete" className="labelCart">Enter the number of delete:</label>

                        <input
                            name="delete"
                            type="number"
                            className="inputCart" 
                            onChange={handleChange}
                            value={deletePcs}
                            min={1}
                            max={findPairForCartDatas?.quantity}
                            placeholder="Type PCS of delete.."/>

                        <button 
                            className="btn btn-danger modifyButton"
                            onClick={() => deleteFromCartById(productId)}
                            disabled={deletePcs == 0 ? true : false}>OK</button>

                    </div>

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
        cartList,
        cartItems
    }  

}