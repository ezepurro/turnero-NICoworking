import { useState } from 'react';

import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye';

import '../styles/components/passwordInput.css'


const PasswordInput = ({ placeholder, inputId }) => {

    const [icon, setIcon] = useState(eyeOff);


    function togglePassword() {
        const passwordInput = document.getElementById(inputId);

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            setIcon(eyeOff);
        } else {
            passwordInput.type = "password";
            setIcon(eye);
        }
    }

    return (
        <div className="password-wrapper">
            <input
                type="password"  
                placeholder={ placeholder }
                className='form-control'
                id={ inputId }
            />
            <span className="eye-icon" onClick={togglePassword}>
                <Icon className="absolute mr-10" icon={icon} size={20}/>
            </span>
        </div>
    )
}

export default PasswordInput
