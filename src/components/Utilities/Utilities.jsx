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
    <div className="flex justify-center items-center flex-1">
      <h2>🌀Loading...</h2>
    </div>
  );
}

export { ContentWrapper, ContentWrapperNoBorder, Loading };
