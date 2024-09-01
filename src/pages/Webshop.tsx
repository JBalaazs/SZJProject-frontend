import '../design/style.css';
import { useWebshopService } from '../service/webshopService';
import MenuBar from "../components/menuBar";

export default function Webshop () {

    /*Service:*/

    const webshopService = useWebshopService();

    /*Return:*/

    return(

        <div className='webshopDesign'>
            
            <div className='menuBarPosition'>
                <MenuBar />
            </div>

            <h1 className='title_Webshop' style={{color: 'white'}}>Shop Now and Experience the Difference!</h1>

            <div className='productsOutside'>

                {

                    webshopService.endpoints_GET.products?.map(x => {

                        return(

                            <div className='productsInside' key={x.productId}>

                                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>

                                    <div style={{height: '100px', width: '100px', border: 'solid 1px red'}}>Pic</div>

                                    {webshopService.webshopButton(x)}


                                </div>

                                <div>

                                    <p className='productTitle'>{x.productName}</p>

                                    <p className='productDescription'>{x.description}</p>

                                    <p className='productPrice'>{x.price}$</p>

                                    <p className='productStock'>{x.stock} pcs available</p>

                                </div>

                            </div>

                        )

                    }

                )}

            </div>

        </div>

    );

}