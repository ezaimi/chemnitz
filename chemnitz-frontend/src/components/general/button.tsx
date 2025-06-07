interface Props{
    label: string;
}

export default function Button({label}:Props) {
    return (
        <div>
            <button className="px-4 py-1.5 border-1 rounded-2xl w-full bg-black text-white">{label}</button>
        </div>
    )

}