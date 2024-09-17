import React from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

const InputField = ({
    type = 'text',
    placeholder,
    value,
    onChange,
    onBlur,
    required,
    errorMessage,
    showPasswordToggle,
    onPasswordToggle
}) => {
    return (
        <div className="relative w-full mb-4">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                required = {required}
                className="w-full p-4 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
            {showPasswordToggle && (
                <div
                    className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                    onClick={onPasswordToggle}
                >
                    {showPasswordToggle ? (
                        <EyeSlashIcon className="h-6 w-6 text-gray-600" />
                    ) : (
                        <EyeIcon className="h-6 w-6 text-gray-600" />
                    )}
                </div>
            )}
            {errorMessage && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
        </div>
    );
};

export default InputField;
