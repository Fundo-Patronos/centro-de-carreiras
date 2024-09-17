import Link from 'next/link';

export default function Home(){
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
            <h1 className="text-5xl font-black text-black mb-8">Welcome to Patronos App</h1>
            <p className="text-xl text-black mb-8">Please choose an option below:</p>

            {/* Links to other pages */}
            <div className="space-x-4">
                <Link className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300" href="/login">
                    Go to Login
                </Link>
                <Link className='bg-green-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition duration-300' href="/mentoria">
                    Go to Mentoria
                </Link>
            </div>
        </div>
    );
}