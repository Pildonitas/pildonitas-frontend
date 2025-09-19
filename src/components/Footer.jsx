import React from 'react';

const Footer = () => {
  const teamMembers = [
    { name: 'Larysa', link: 'https://www.linkedin.com/in/larysa-ambartsumian/' },
    { name: 'Michelle', link: 'https://www.linkedin.com/in/michelle-gelves/' },
    { name: 'David', link: 'https://www.linkedin.com/in/david-vaamonde-bueno-a31049202/' },
    { name: 'Luisa', link: 'https://www.linkedin.com/in/luisa-moreno-474334338/' },
    { name: 'Sofia', link: 'https://www.linkedin.com/in/sof%C3%ADa-toro-viafara-690124356/' },
    { name: 'Bruna', link: 'https://www.linkedin.com/in/bruna-sonda/' },
    { name: 'Thais', link: 'https://www.linkedin.com/in/thaisrochadequeiroz/' }
  ];

  return (
    <footer className="bg-[#ECF0F1] py-6 px-4 mt-auto font-sans rounded-md">
      <style>{`
        .custom-teal { color: #005F9E; }
        .custom-teal-border { border-color: #005F9E; }
        .custom-teal-bg { background-color: #005F9E; }
        .custom-teal-opacity { color: #005F9E; }
        .custom-teal-light { color: #005F9E; }
        .team-member { margin-right: 20px; display: inline-block; }
      `}</style>

      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 custom-teal">
            Hackathon F5 - 8ª Edición
          </h3>
          <p className="text-sm mb-3 custom-teal">
            Este proyecto fue creado durante la participación en Hackathon F5 - 8ª Edición
          </p>
        </div>

        <div className="mb-4">
          <p className="text-sm mb-2 custom-teal-opacity">
            Equipo de desarrolladores:
          </p>
          <div className="text-sm">
            {teamMembers.map((member) => (
              member.link ? (
                <a
                  key={member.name}
                  href={member.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="team-member px-3 py-1 rounded-md border-2 custom-teal custom-teal-border bg-transparent hover:bg-opacity-100 hover:text-white transition-all duration-200 cursor-pointer hover:custom-teal-bg"
                >
                  {member.name}
                </a>
              ) : (
                <span
                  key={member.name}
                  className="team-member px-3 py-1 rounded-md border-2 custom-teal custom-teal-border bg-transparent"
                >
                  {member.name}
                </span>
              )
            ))}
          </div>
        </div>

        <div className="text-xs custom-teal-light">
          © {new Date().getFullYear()} • Creado con ❤️ para Hackathon F5
        </div>
      </div>
    </footer>
  );
};

export default Footer;
