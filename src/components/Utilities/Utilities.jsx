function ContentWrapper(props) {
  // console.log(className);
  return (
    <>
      <div
        className={`mt-7 bg-white ${
          props.paddingBlock ? props.paddingBlock : "p-5"
        } rounded-lg border-purple-200 border-2`}
      >
        {props.children}
      </div>
    </>
  );
}

function ContentWrapperNoBorder({ children }) {
  return (
    <>
      <div className="mt-5 bg-white p-5 rounded-lg">{children}</div>
    </>
  );
}

export { ContentWrapper, ContentWrapperNoBorder };
