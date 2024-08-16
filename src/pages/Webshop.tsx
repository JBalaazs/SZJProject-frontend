import '../design/style.css';
import { useWebshopService } from '../service/webshopService';
import MenuBar from "../components/menuBar";

export default function Webshop () {

    /*Service:*/

    const webshopService = useWebshopService();

    /*Return:*/

    return(

        <div className='WebshopDesign'>
            
            <MenuBar />

            <h1 className='title_Webshop'>Shop Now and Experience the Difference!</h1>

            <div className='productsOutside'>

                {

                    webshopService.endpoints_GET.products?.map(x => {

                        return(

                            <div className='productsInside' key={x.productId}>

                                <p className='productTitle'>{x.productName}</p>

                                <p className='productDescription'>{x.description}</p>

                                <p className='productPrice'>{x.price}$</p>

                                {webshopService.webshopButton(x)}

                                <p className='productStock'>{x.stock} pcs available</p>

                            </div>

                        )

                    }

                )}

            </div>

        </div>

    );

}