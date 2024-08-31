import { HTMLInputTypeAttribute, useEffect, useState } from "react";
import { detailType, formattedValueType } from "../interfaces/InterfaceCollection";
import { bankType } from "../interfaces/InterfaceCollection";
import { errorBankType } from "../interfaces/InterfaceCollection";
import { addressType } from "../interfaces/InterfaceCollection";
import { POST } from "../endpoints/POST";
import { GET } from "../endpoints/GET";
import { PUT } from "../endpoints/PUT";
import { consumers } from "stream";

export function useClientService () {

    /*endpoints:*/

    const endpoints_POST = POST();
    const endpoints_GET = GET();
    const endpoints_PUT = PUT();

    /*useEffect:*/

    useEffect(() => {

        endpoints_GET.getDetails();

    }, [])

    /*useState:*/

    const [formattedValue, setFormattedValue] = useState<formattedValueType | null>(null);

    const [bankData, setBankData] = useState<bankType | null>(null);

    const [errorBankData, setErrorBankData] = useState<errorBankType | null>(null);

    const [address, setAddress] = useState<addressType | null>(null);

    const [email, setEmail] = useState('');

    const [errorEmail, setErrorEmail] = useState('');

    const [nextPage, setNextPage] = useState(false);

    const [errorAddressData, setErrorAddressData] = useState<addressType | null>(null);

    const [isSettingsVisible, setIsSettingsVisible] = useState(false);
    
    const [isPictureViewVisible, setIsPictureViewVisible] = useState(false);

    const [isPictureChangeVisible, setIsPictureChangeVisible] = useState(false);

    const [profileImage, setProfileImage] = useState('');

    const [imageFile, setImageFile] = useState<File | null>(null);

    /*Function:*/

    const setErrorBank = (name: string, isValid: boolean) => {

        setErrorBankData(prev => ({

            ...prev,
            [name]: isValid ? 'green' : 'red'

        } as errorBankType));

    }

    const setErrorAddress = (name: string, isValid: boolean) => {

        setErrorAddressData(prev => ({

            ...prev,
            [name]: isValid ? 'green' : 'red'

        } as addressType))

    }

    const isFormValidBankData = () => {

        if(errorBankData)
        {

            return !Object.values(errorBankData).includes('red');

        }

    }

    const isFormValidAddressData = () => {

        if(errorAddressData)
        {

            return !Object.values(errorAddressData).includes('red');

        }

    }

    const setBank_useState = (isValid: boolean, name: string, value: string) => {

        if(isValid)
        {

            setBankData(prev => ({

                ...prev,
                [name]: name == 'newBalance' ? Number(value) : value

            } as bankType));

        }

    } 

    const setAddress_useState = (isValid: boolean, name: string, value: string) => {
                
        if(isValid)
        {
        
            setAddress(prev => ({
            
                ...prev,
                [name]: value
                
            
            } as addressType));
        
        }

    }

    const isAddress = (): addressType | null => {

        const address = endpoints_GET.detail?.address;

        if(address)
        {

            return address;

        }

        return null;

    }

    /*onChange:*/

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = event.target;

        /*BANK:*/

        if (name === 'cardNumber') {

            const cleanedValue = value.replace(/\s+/g, '');
            
            const validCardNumber = /^[0-9]{0,16}$/;

            const formattedValue = cleanedValue.match(/.{1,4}/g)?.join(' ') || '';

            setFormattedValue(prev => ({

                ...prev,
                cardNumber: formattedValue

            } as formattedValueType))

            const isValid = validCardNumber.test(cleanedValue) && cleanedValue.length == 16;

            setBank_useState(isValid, 'cardNumber', cleanedValue);

            setErrorBank('cardNumber', isValid);

        }

        if(name == 'holderName') {

            const isValid = /^[A-Za-z]+(?:\s[A-Za-z]+){1,}$/.test(value);

            setBank_useState(isValid, 'holderName', value);

            setErrorBank('holderName', isValid);

        }

        if (name == 'expiryDate') {

            const cleanedValue = value.replace(/\D/g, '');

            const valid = /^[0-9]{0,4}$/;
        
            if (valid.test(cleanedValue)) {
                
                const formattedValue = cleanedValue.match(/.{1,2}/g)?.join('/') || '';

                const [month, year] = formattedValue.split('/').map(Number);

                const isValidMonth = month >= 1 && month <= 12;
                const isValidYear = year >= 0 && year <= 99;

                setFormattedValue(prev => ({

                    ...prev,
                    expirationDate: formattedValue

                } as formattedValueType))

                const isValid = isValidMonth && isValidYear;

                if(isValid)
                {

                    setBank_useState(isValid, 'expirationDate', formattedValue);

                }

                setErrorBank('expirationDate', isValid);

            }
        }

        if(name == 'cvv') {

            const isValid = /^[0-9]{0,3}$/.test(value) && value.length == 3;

            if(isValid)
            {

                setBank_useState(isValid, 'cvv', value);

            }

            setErrorBank('cvv', isValid);

        }

        if(name == 'newBalance') {

            const isValid = /^[0-9]{1,}$/.test(value);

            if(isValid)
            {

                setBank_useState(isValid, 'newBalance', value);

            }

            setErrorBank('newBalance', isValid);

        }

        /*ADDRESS:*/

        if(name == 'city') {

            const isValid = /^[A-Za-z]{0,}$/.test(value) && value.length > 0;

            setAddress_useState(isValid, 'city', value);

            setErrorAddress('city', isValid);

        }

        if(name == 'country') {

            const isValid = /^[A-Za-z]{0,}$/.test(value) && value.length > 0;

            setAddress_useState(isValid, 'country', value);

            setErrorAddress('country', isValid);

        }

        if(name == 'street') {

            const isValid = /^[A-Za-z]+(?:\s[A-Za-z]+){1,}$/.test(value) && value.length > 0;

            setAddress_useState(isValid, 'street', value);

            setErrorAddress('street', isValid);

        }

        if(name == 'zipCode') {

            const isValid = /^[0-9]{4}$/.test(value) && value.length > 0;

            setAddress_useState(isValid, 'zipCode', value);

            setErrorAddress('zipCode', isValid);

        }

        /*EMAIL:*/
        
        if(name == 'email') {

            const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

            if(isValid)
            {

                setEmail(value);
                setErrorEmail('green');

            }
            else
            {

                setErrorEmail('red');

            }

        }

        /*PROFILE IMAGE:*/

        if(name == 'profileImage')
        {

            if(event.target.files)
            {

                const file = event.target.files[0];

                const imageURL = URL.createObjectURL(file);

                setProfileImage(imageURL);
                
                if(file)
                {

                    setImageFile(file);

                }

            }

        }

    }

    const getMoney = () => {

        if(bankData)
        {

            endpoints_POST.getBalance(bankData);

        }

    }

    const saveAddress = () => {

        if(address && endpoints_GET.detail)
        {

            const detail: detailType = {

                username: endpoints_GET.detail?.username, 
                balance: endpoints_GET.detail?.balance, 
                email: endpoints_GET.detail.email ? endpoints_GET.detail.email : email, /*saveEmail, updateEmail miss.*/
                address: address
            
            };

            endpoints_PUT.saveAddress(detail);

        }

    }

    const saveEmail = () => {

        setNextPage(true);

    }

    const toggleDropDownSettings = () => {

        setIsSettingsVisible(!isSettingsVisible);

    }

    const toggleDropDownViewPicture = () => {

        if(isPictureChangeVisible)
        {

            setIsPictureChangeVisible(!isPictureChangeVisible);
            setIsPictureViewVisible(!isPictureViewVisible);

        }
        else
        {

            setIsPictureViewVisible(!isPictureViewVisible);

        }

    }

    const toggleDropDownChangePicture = () => {

        if(isPictureViewVisible)
        {

            setIsPictureViewVisible(!isPictureViewVisible);
            setIsPictureChangeVisible(!isPictureChangeVisible);

        }
        else
        {

            setIsPictureChangeVisible(!isPictureChangeVisible);

        }

    }

    const saveImage = () => {

        if(imageFile)
        {

            console.log(imageFile);
            endpoints_POST.upgradePicture(imageFile);

        }

    }

    /*Return:*/

    return{
        handleChange,
        getMoney,
        isFormValidBankData,
        isFormValidAddressData,
        saveAddress,
        isAddress,
        saveEmail,
        toggleDropDownSettings,
        toggleDropDownViewPicture,
        toggleDropDownChangePicture,
        saveImage,

        errorBankData,
        formattedValue,
        errorAddressData,
        address,
        endpoints_GET,
        email,
        errorEmail,
        nextPage,
        isSettingsVisible,
        isPictureViewVisible,
        isPictureChangeVisible,
        profileImage

    }

}