interface Props {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export default function CardMember({ name, role, image, bio }: Props) {
  return (
    <div className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 flex flex-col items-center text-center">
      <div className="relative w-40 h-40 mb-6 group-hover:scale-105 transition-transform duration-500">
        <div className="absolute inset-0 bg-brand-accent rounded-full opacity-0 group-hover:opacity-10 blur-xl transition-opacity"></div>
        <img src={image} alt={name} className="w-full h-full object-cover rounded-full border-4 border-white shadow-md transition-all duration-700" />
      </div>
      <h3 className="text-xl font-heading font-bold text-brand-dark mb-1">{name}</h3>
      <p className="text-brand-accent text-sm font-bold uppercase tracking-widest mb-4">{role}</p>
      <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-500">{bio}</p>
    </div>
  );
}
