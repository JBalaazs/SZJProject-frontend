import { useNavigateService } from "../service/navigateService";

export default function BuyIt () {

    const navigateService = useNavigateService();

    return(
        <>

            <button className="btn btn-primary backButton" onClick={() => navigateService.navigate('/webshop')}>Back</button>

            <h1 className="title">Order your item(s).</h1>

            <div className="buyItBox">
                <div className="buyItInside">
                    
                </div>
                <div className="buyItInside">
                    
                </div>
            </div>

        </>
    );

}