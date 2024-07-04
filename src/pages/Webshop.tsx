import '../design/style.css';
import { useNavigateService } from '../service/navigateService';
import { useWebshopService } from '../service/webshopService';

export default function Webshop () {

    /*Service:*/

    const navigateService = useNavigateService();
    const webshopService = useWebshopService();

    /*Return:*/

    return(

        <div className='WebshopDesign'>
            
            <button className="btn btn-primary backButton" onClick={() => navigateService.navigate('/')}>Back</button>
            <button className="btn btn-primary addProductButton" onClick={() => navigateService.navigate('/addproduct')}>Add product</button>

            <h1 className='title_Webshop'>Shop Now and Experience the Difference!</h1>

            <div className='productsOutside'>

                {

                    webshopService.products?.map(x => {

                        return(

                            <div className='productsInside' key={x.productId}>

                                <p className='productTitle'>{x.productName}</p>

                                <p className='productDescription'>{x.description}</p>

                                <p className='productPrice'>{x.price}$</p>

                                <button className={x.seller == webshopService.getUsername() ? 'btn btn-primary modifyButton' : 'btn btn-primary buyButton'} onClick={() => x.seller == webshopService.getUsername() ? navigateService.navigate('/modify') : navigateService.navigate(`/buyit/${x.productId}`)}>{x.seller == webshopService.getUsername() ? 'Modify' : 'Buy It'}</button>

                                <p className='productStock'>{x.stock} pcs available</p>

                            </div>

                        )

                    }

                )}

            </div>

        </div>

    );

}