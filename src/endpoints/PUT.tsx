import { modifyProductType } from "../interfaces/InterfaceCollection";

export function PUT () {

    /*Token:*/

    const token = localStorage.getItem('token');

    /*Function:*/

    const addModifyProduct = (modifyData: modifyProductType) => {

        fetch(`${process.env.REACT_APP_API_URL}/products`, {

            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(modifyData)

        })
        .catch(error => {
            console.error('Error:', error);
        });

    }

    /*Return:*/

    return{
        addModifyProduct
    }

}