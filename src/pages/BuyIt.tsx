import { useNavigateService } from "../service/navigateService";
import { useBuyItService } from "../service/buyItService";

export default function BuyIt () {

    /*Service:*/

    const navigateService = useNavigateService();
    const buyItService = useBuyItService();

    /*Return:*/

    return(
        <>

            <button className="btn btn-primary backButton" onClick={() => navigateService.navigate('/webshop')}>Back</button>

            <h1 className="title">Order your item(s).</h1>

            <div className="buyItBox">
                <div className="buyItInside">
                    <p>Eredmény: {}</p>
                </div>
                <div className="buyItInside">
                    
                </div>
            </div>

        </>
    );

}