import React from 'react';

type FooterColumn = {
  title: string;
  links: Array<{
    label: string;
    href: string;
  }>;
};

const Footer = () => {
  const footerColumns: FooterColumn[] = [
    {
      title: "VER MAIS",
      links: [
        { label: "Patronos", href: "https://www.patronos.org" },
      ]
    },
    {
      title: "CONTATO",
      links: [
        { label: "contato@patronos.org", href: "#" },
      ]
    },
    {
      title: "SOCIAL",
      links: [
        { label: "Redes sociais", href: "#" },
      ]
    }
  ];

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row">
          {/* Main content column */}
          <div className="md:w-1/3 mb-8 md:mb-0">
            <div>
              <h1 className="text-2xl font-semibold">Associação Fundo Patrimonial Patronos</h1>
              <p>CNPJ: 40.418.520/0001-33</p>
              <p>Jd. Nossa Senhora Auxiliadora, 257 - Campinas, SP</p>
              
             
              <div className="mt-8 text-gray-400 text-sm">
              <p className="text-gray-400 text-sm mt-4">
                Créditos das fotografias usadas neste site
                Antoninho Perri, SEC/Unicamp
                Antonio Scarpinetti, SEC/Unicamp
              </p>
              </div>
            </div>
          </div>

          {/* Spacer */}
          <div className="md:w-1/12" />

          {/* Footer columns with equal spacing */}
          <div className="md:w-7/12 flex justify-start space-x-16">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h2 className="text-sm font-medium tracking-wider mb-4">{column.title}</h2>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white text-sm transition duration-150 ease-in-out"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;