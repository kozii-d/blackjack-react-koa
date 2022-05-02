import React, {useState} from 'react';
import { v4 as uuidv4 } from 'uuid';

const LoginPage = ({getToken}) => {

    const [formValue, setFormValue] = useState({});
    const [inputs, setInputs] = useState([uuidv4(), uuidv4()]);

    const handleAddInput = () => {
        setInputs([...inputs, uuidv4()]);
    }

    const handleDeleteInput = (e) => {
        setInputs(inputs.filter(id => id !== e.target.parentNode.id));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getToken(Object.values(formValue));
    }

    const handleChange = (e) => {
        setFormValue({...formValue, [e.target.name]: e.target.value});
    }

    return (
        <div className='login'>
            <h2 className='login__title'>create players</h2>
            <form className='login__form' onSubmit={handleSubmit}>
                {inputs.map((item) => (
                    <div className='login__item' key={item} id={item}>
                        <input className='login__input' required type='text' name={`name${item}`} onChange={handleChange} />
                        {
                            inputs.length <= 2
                            ? null
                            : <button className='login__btn-close' type='button' onClick={handleDeleteInput}>✖</button>
                        }
                    </div>
                ))}
                <button className='login__btn-form login__btn-form_close' type='button' onClick={handleAddInput}>add player</button>
                <button className='login__btn-form login__btn-form_send' type='submit'>start game</button>
            </form>
        </div>
    );
};

export default LoginPage;