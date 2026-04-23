export default function SocialButtons() {
  const links = [
    { href: 'https://www.facebook.com/frpdpk', icon: 'fab fa-facebook-f', bg: 'bg-[#1877F2]' },
    { href: 'https://whatsapp.com/channel/0029Vae6bpnISTkOmoPQwp25', icon: 'fab fa-whatsapp', bg: 'bg-[#25D366]' },
    { href: 'https://www.linkedin.com/in/frpd2018', icon: 'fab fa-linkedin-in', bg: 'bg-[#0A66C2]' },
    { href: '#', icon: 'fab fa-instagram', bg: 'bg-[#E4405F]' },
    { href: 'https://www.youtube.com/channel/UCDygs990-Kf2Jn_Tt3JikqA', icon: 'fab fa-youtube', bg: 'bg-[#E4405F]' },
  ];

  return (
    <div className="fixed z-50 transition-all duration-500 top-1/2 -translate-y-1/2 right-4 flex flex-col items-center gap-4 px-2 py-5 glass rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.3)] md:right-0 md:px-0 md:py-0 md:bg-transparent md:border-none md:shadow-none md:translate-x-1 md:hover:translate-x-0 md:pr-2">
      {links.map((link, i) => (
        <a
          key={i}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-8 h-8 md:w-10 md:h-10 ${link.bg}/80 md:${link.bg} border border-transparent text-white rounded-full flex items-center justify-center text-sm md:text-lg hover:shadow-lg hover:scale-110 transition-all duration-300`}
          style={{ backgroundColor: link.bg.replace('bg-[', '').replace(']', '').replace('/80', '') }}
        >
          <i className={link.icon}></i>
        </a>
      ))}
    </div>
  );
}
