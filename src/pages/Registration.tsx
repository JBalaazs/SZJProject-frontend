import { useNavigate } from "react-router-dom";
import './style.css';
import { useState } from "react";
import { eventNames } from "process";

export default function Registration () {

    /*Navigate:*/

    const navigate = useNavigate();

    /*useState:*/

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [atLeast5Characters, setAtLeast5Characters] = useState(false);
    const [atLeast1UppercaseLetter, setAtLeast1UppercaseLetter] = useState(false);

    /*onChange:*/

    const onChange_username : React.ChangeEventHandler<HTMLInputElement> = (event) => {

        setUsername(event.target.value);

    }

    const onChange_password : React.ChangeEventHandler<HTMLInputElement> = (event) => {

        let passwordTest = event.target.value;

        if(passwordTest.length < 5)
        {

            setAtLeast5Characters(false);

        }
        else
        {

            setAtLeast5Characters(true);

        }

        if(!/[A-Z]/.test(passwordTest))
        {

            setAtLeast1UppercaseLetter(false)

        }
        else
        {

            setAtLeast1UppercaseLetter(true);

        }

        if(atLeast1UppercaseLetter && atLeast5Characters)
        {

            setPassword(passwordTest);

        }

    }

    /*Function:*/

    /*Return:*/

    return(



            <div className='outsideDIV'>
            
                <button className="btn btn-primary backButton" onClick={() => navigate('/')}>Back</button>

                <div className='insideDIV'>

                    <h2 className='title'>Registration</h2>

                    <input type="text" className="inputStyle" placeholder="Username" onChange={onChange_username}/>
                    <input type="password" className="inputStyle" placeholder="Password" onChange={onChange_password}/>

                    <button className='btn btn-primary menuButton' disabled={!atLeast5Characters || !atLeast1UppercaseLetter}>Registration</button>

                    <div className="conditionDIV">
                        <p>{atLeast5Characters ? '✔' : '✘'} Password must be at least 5 characters long.</p>
                        <p>{atLeast1UppercaseLetter ? '✔' : '✘'} Password must be contain at least one uppercase letter.</p>
                        <p>{atLeast5Characters && atLeast1UppercaseLetter ? '✔' : '✘'} Correct password.</p>
                    </div>

                </div>
            
            </div>


    )

}