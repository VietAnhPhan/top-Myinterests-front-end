import { useRouteError } from "react-router";

function ContentWrapper(props) {
  // console.log(className);
  return (
    <>
      <div
        className={`mt-7 ${props.bgColor ? props.bgColor : "bg-white"} ${
          props.paddingBlock ? props.paddingBlock : "p-5"
        } rounded-xl border-purple-200 border-2`}
      >
        {props.children}
      </div>
    </>
  );
}

function ContentWrapperNoBorder({ children }) {
  return (
    <>
      <div className="mt-5 bg-white p-5 rounded-xl">{children}</div>
    </>
  );
}

function Loading() {
  return (
    <div className="absolute left-1/2 top-1/2">
      <h2>🌀Loading...</h2>
    </div>
  );
}

function ErrorCatching() {
  const error = useRouteError();

  return (
    <div className="flex-1 flex items-center justify-center">
      <p>{`Error: ${error.message}`}</p>
    </div>
  );
}

function DateTimeString(props) {
  const d = new Date(props.datetime);
  const customDateTime = `${d.getMonth()}-${d.getDate()}-${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()}`;

  return <>{customDateTime}</>;
}

export {
  ContentWrapper,
  ContentWrapperNoBorder,
  Loading,
  ErrorCatching,
  DateTimeString,
};
