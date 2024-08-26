export interface productType {

    productName: string,
    productDescription: string,
    price: number,
    stock: number,
    productCondition: 'New' | 'Used' | 'Refurbished'

}

export interface extendedProductType {

    productId: number,
    available: boolean,
    creationDate: Date,
    description: string,
    price: number,
    productCondition: string,
    productName: string,
    seller: string,
    stock: number

}

export interface cartType {

    cartId: number,
    cartItems: {
        productId: number,
        quantity: number
    }[]

}

export interface addressType {

    id: number,
    city: string,
    country: string,
    street: string,
    zipCode: string,

}

export interface formattedValueType {

    cardNumber: '',
    expirationDate: ''

}

export interface bankType {

    cardNumber: string,
    holderName: string,
    expirationDate: string,
    cvv: string,
    newBalance: number

}

export interface errorBankType {

    cardNumber: string,
    holderName: string,
    expirationDate: string,
    cvv: string,
    newBalance: string

}

export interface authType {

    username: string,
    password: string

}

export interface modifyProductType {

    productId: number,
    productName: string,
    productDescription: string,
    price: number

}

export interface checkRegisterType {

    atLeast5Characters: boolean,
    atLeast1UppercaseLetter: boolean,
    correctUsername: boolean,
    isRegisterSuccessfulOrTaken: string

}

export interface detailType {

    username: string,
    balance: number,
    email: string,
    address: addressType

}

export function IinterfaceCollection () { }