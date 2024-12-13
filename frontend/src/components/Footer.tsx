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
        { label: "", href: "#" },
      ]
    },
    {
      title: "SOCIAL",
      links: [
        { label: "LINKEDIN", href: "#" },
      ]
    }
  ];

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold">Associação fundo patrimonial Patronos</h1>
              <p className="text-gray-400 text-sm mt-4">
                Centro de Carreiras Patronos
              </p>
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="space-y-4">
              <h2 className="text-sm font-medium tracking-wider">{column.title}</h2>
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
    </footer>
  );
};

export default Footer;