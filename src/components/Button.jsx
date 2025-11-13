import { useFormStatus } from "react-dom";

function Button(props) {
  const { pending } = useFormStatus();

  console.log(pending);
  return (
    <>
      <button
        className={`bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white px-3 py-1 rounded-lg ${props.className}`}
        onClick={props.callback}
        type={props.type ? props.type : ""}
        disabled={pending}
        style={{ height: "-webkit-fill-available" }}
      >
        {props.icon} {pending ? props.text + "..." : props.text}
      </button>
    </>
  );
}

export { Button };
