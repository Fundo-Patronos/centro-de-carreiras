import Link from 'next/link';

export default function Home(){
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
            <h1 className="text-4xl font-black text-black mb-8">Patronos</h1>
            <h1 className="text-5xl font-black text-black mb-12">Centro de Carreiras</h1>
            {/* Links to other pages */}
            <div className="space-x-4">
                <Link className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300" href="/login">
                    Login
                </Link>
                <Link className='bg-green-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition duration-300' href="/mentoria">
                    Mentoria
                </Link>
            </div>
        </div>
    );
}