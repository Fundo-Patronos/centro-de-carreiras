// app/verify/page.js
import Link from 'next/link';
import Button from '../../components/GradientButton'; // Ajuste o caminho conforme necessário

const VerifyEmailIndex = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-2xl font-bold text-gray-500">
                Para verificar seu e-mail, forneça um token na URL.
            </h1>
            <Link href="/">
                <Button className="mt-5 px-4 py-2">
                    Login
                </Button>
            </Link>
        </div>
    );
};

export default VerifyEmailIndex;
