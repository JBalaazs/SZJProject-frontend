import { useCartService } from "../service/cartService";
import { useNavigateService } from "../service/navigateService"

export default function Cart () {

    /*Service:*/

    const navigateService = useNavigateService();
    const cartService = useCartService();

    /*Return:*/

    return(
        
        <div className="outsideDIV">

            <button className="btn btn-primary backButton" onClick={() => navigateService.navigate('/webshop')}>Back</button>

            <div className="insideDIV_Cart">

                {cartService.cartList()}

{/*                 <div className="productPrice_Cart">

                    <h3>28.5 <span className="buyitDollarSign">$</span></h3>
                    <button className="btn btn-success buyButton" style={{fontWeight: 'bold'}}>Vásárlás</button>

                </div> */}
                
            </div>

        </div>
    )

}