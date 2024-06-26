import '../design/style.css';
import { useNavigateService } from '../service/navigateService';

export default function Webshop () {

    /*Serive:*/

    const navigateService = useNavigateService();

    return(
        <>
            
            <button className="btn btn-primary backButton" onClick={() => navigateService.navigate('/')}>Back</button>

            <h1 className='title_Webshop'>Shop Now and Experience the Difference!</h1>

            <div className='productsOutside'>

                <div className='productsInside'>

                    <p className='productTitle'>Title</p>

                    <p className='productDescription'>Description about a product. Somebody want to sell it, now you can buy it. MAX 210 available</p>

                    <button className='btn btn-primary buyProduct' onClick={() => navigateService.navigate('/buyit')}>Buy It</button>

                </div>

                <div className='productsInside'>

                    

                </div>

                <div className='productsInside'>

                                

                </div>

                <div className='productsInside'>

                                

                </div>

                <div className='productsInside'>

                                

                </div>

            </div>

        </>
    );

}