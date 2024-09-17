export default function Button({ children, onClick, className = '', ...props }) {
    return (
        <button
            onClick={onClick}
            className={`w-full bg-blue-500 text-white p-4 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 ease-in-out ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
