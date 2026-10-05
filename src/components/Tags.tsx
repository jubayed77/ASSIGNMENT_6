export default function Tags({ list }: { list: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {list.map((tag) => (
        <span key={tag} className="bg-accent text-black text-[10px] font-bold uppercase px-2 py-0.5 rounded">
          {tag}
        </span>
      ))}
    </div>
  );
}
