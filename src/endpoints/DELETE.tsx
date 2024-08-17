export function DELETE () {

    /*Token:*/

    const token = localStorage.getItem('token');

    /*Function:*/

    const deleteProduct = (productId: number ) => {

        fetch(`${process.env.REACT_APP_API_URL}/products?productId=${productId}`, {

            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }

        })
        .catch(error => {
            console.error('Error:', error);
        });


    }

    const deleteOrder = () => {

        fetch(`${process.env.REACT_APP_API_URL}/orders`, {

            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }

        })
        .catch(error => {
            console.error('Error:', error);
        });

    }

    /*Return:*/

    return{
        deleteProduct,
        deleteOrder
    }

}