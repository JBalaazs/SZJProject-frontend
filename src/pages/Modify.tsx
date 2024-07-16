import { useNavigateService } from "../service/navigateService";
import { useModifyService } from "../service/modifyService";
import MenuBar from "../components/menuBar";
import { useAddProductService } from "../service/addProductService";

export default function Modify () {

    /*Service:*/

    const addProductService = useAddProductService();
    const modifyService = useModifyService();

    /*Return:*/

    return(
        <>

            <MenuBar />

            <div className="outsideDIV">
                
                <div className="insideDIV_Login">

                    <input 
                        type="text"
                        defaultValue={modifyService.productDatasThatWillBeModify()?.productName}
                        name="productName"
                        placeholder="Name"
                        className="inputStyle_AddProduct"
                        onChange={modifyService.handleChange}/>

                    <input 
                        type="text"
                        defaultValue={modifyService.productDatasThatWillBeModify()?.description}
                        name="productDescription"
                        placeholder="Description"
                        className="inputStyle_AddProduct"
                        onChange={modifyService.handleChange}/>

                    {addProductService.textByCharacterCount(modifyService.characterCount).pTag}

                    <input 
                        type="text"
                        defaultValue={modifyService.productDatasThatWillBeModify()?.price}
                        name="price" placeholder="Price"
                        className="inputStyle_AddProduct"
                        onChange={modifyService.handleChange}/>

                    <button
                        className="btn btn-primary loginButton"
                        onClick={modifyService.addModifyProduct}>
                        Modify product</button>

                    <button
                        className="btn btn-primary modifyButton" style={{width: '200px'}}
                        onClick={modifyService.deleteProduct}>
                        Delete product</button>

                </div>

            </div>

        </>
    )

}