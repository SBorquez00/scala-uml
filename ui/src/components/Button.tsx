export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className="border-red-500 border-2 p-1 rounded shadow-md ml-1 bg-slate-50 hover:bg-slate-400/75 text-xl"
    ></button>
  );
}
