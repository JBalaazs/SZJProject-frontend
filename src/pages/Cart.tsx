import MenuBar from "../components/menuBar";
import { useCartService } from "../service/cartService";

export default function Cart () {

    /*Service:*/

    const cartService = useCartService();

    /*Return:*/

    return(
        
        <div className="outsideDIV">

            <MenuBar />

            <div className="insideDIV_Cart">

                {cartService.cartList()}
                
            </div>

        </div>
    )

}