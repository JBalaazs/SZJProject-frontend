import { useNavigateService } from "../service/navigateService"

export default function Cart () {

    /*Serive:*/

    const navigateService = useNavigateService();

    /*Return:*/

    return(
        
        <div className="outsideDIV">

            <button className="btn btn-primary backButton" onClick={() => navigateService.navigate('/webshop')}>Back</button>

            <div className="insideDIV_Cart">

                <div className="productList">

                    <h3>Cart.</h3>
                    <button className="btn btn-danger">Törlés</button>

                </div>

                <div className="productList">

                    <h3>Cart.</h3>
                    <button className="btn btn-danger">Törlés</button>

                </div>

                <div className="productList">

                    <h3>Cart.</h3>
                    <button className="btn btn-danger">Törlés</button>

                </div>

                <div className="productPrice_Cart">

                    <h3>28.5 <span className="buyitDollarSign">$</span></h3>
                    <button className="btn btn-success">Vásárlás</button>

                </div>
                
            </div>

        </div>
    )

}