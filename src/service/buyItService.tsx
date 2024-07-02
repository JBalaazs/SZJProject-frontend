import { useEffect, useState } from "react";
import { productStruct, useWebshopService } from "./webshopService";

export function useBuyItService () {

    /*useState:*/

    

    /*Service:*/

    const webshopService = useWebshopService();

    /*Function:*/

    const selectedItem = (ItemId: number) => {



    }

    /*Return:*/

    return{
        selectedItem,
    }

}