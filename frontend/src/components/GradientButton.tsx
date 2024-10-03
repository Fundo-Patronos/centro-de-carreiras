interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

export default function GradientButton({ children, onClick, className = '', ...props }: GradientButtonProps)  {
    return (
        <button
            onClick={onClick}
            className={`w-full p-2 lg:p-3 text-white rounded-lg font-semibold hover:opacity-90 transition duration-300 ease-in-out ${className}`}
            style={{
                background: 'linear-gradient(to right, #FF6666, #C964E2)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            }}
            {...props}
        >
            {children}
        </button>
    );
}
