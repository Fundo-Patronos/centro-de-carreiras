const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 text-center">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold mb-4">Centro de Carreiras Patronos</h2>
        <p className="text-lg mb-8">Entre em contato conosco</p>
        <a
          href="https://www.patronos.org"
          className="text-black bg-white hover:bg-gray-200 rounded-md px-4 py-2"
        >
          Visitar site Patronos
        </a>
      </div>
    </footer>
  );
};

export default Footer;
