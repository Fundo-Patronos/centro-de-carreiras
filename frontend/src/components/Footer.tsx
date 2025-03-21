import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


type FooterColumn = {
  title: string;
  links: Array<{
    label: string;
    href: string;
    icon?: React.ReactNode;
  }>;
};

const Footer = () => {
  const footerColumns: FooterColumn[] = [
    {
      title: "MAIS SOBRE O PATRONOS",
      links: [
        { 
          label: "www.patronos.org", 
          href: "https://www.patronos.org"
        },
      ]
    },
    {
      title: "DÚVIDAS OU SUGESTÕES?",
      links: [
        { label: "contato@patronos.org", href: "#" },
      ]
    },
    {
      title: "SOCIAL",
      links: [
        { 
          label: "Facebook", 
          href: "https://www.facebook.com/fundopatronos/",
          icon: <FacebookIcon fontSize="small" />
        },
        { 
          label: "Instagram", 
          href: "https://www.instagram.com/fundopatronos/?hl=en",
          icon: <InstagramIcon fontSize="small" />
        },
        { 
          label: "LinkedIn", 
          href: "https://www.linkedin.com/company/fundo-patronos/?originalSubdomain=br",
          icon: <LinkedInIcon fontSize="small" />
        },
      ]
    }
  ];

  return (
    <footer className="bg-[#f2f2f2] text-black py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col space-y-8">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="md:w-1/3 mb-8 md:mb-0">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Image
                    src="/images/logos/1.Preto/Simbolo-Patronos-Preto.png"
                    alt="Associação Fundo Patrimonial Patronos"
                    width={50}
                    height={40}
                    style={{ width: "auto", height: "auto" }}
                  />
                  <div className="h-12 border-l-2 border-gray-400"></div>
                  <Link
                    href="/home"
                    className="text-black leading-tight text-sm font-semibold"
                  >
                    <span className="block">Associação</span>
                    <span className="block">Fundo Patrimonial</span>
                    <span className="block font-black">Patronos</span>
                  </Link>
                </div>
                <div className="mt-8 text-gray-600 text-sm">
                  <p className="text-gray-600 text-sm mt-4">
                    Créditos das fotografias acadêmicas usadas neste site:<br/>
                    Antoninho Perri, SEC/Unicamp<br/>
                    Antonio Scarpinetti, SEC/Unicamp
                  </p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex flex-col md:flex-row md:justify-between space-y-8 md:space-y-0 md:gap-4">
              {footerColumns.map((column) => (
                <div key={column.title} className="max-w-[300px]">
                  <h2 className="text-sm font-medium tracking-wider mb-4">{column.title}</h2>
                  <ul className="space-y-2">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-gray-600 hover:text-black text-sm transition duration-150 ease-in-out flex items-center gap-2"
                        >
                          {link.icon && link.icon}
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-300 pt-8"> 
            <div className="text-center text-gray-600 text-xs">
              <p>CNPJ: 40.418.520/0001-33</p>
              <p>Jd. Nossa Senhora Auxiliadora, 257 - Campinas, SP</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;