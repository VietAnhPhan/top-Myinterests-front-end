import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

function WarningToast(props) {
  return (
    <>
      <div className="fixed bottom-10 right-10 bg-white shadow-lg border border-gray-300 py-3 px-5 rounded-xl flex gap-x-3 items-center">
        <ErrorOutlineOutlinedIcon />
        <p>{props.message}</p>
      </div>
    </>
  );
}

export { WarningToast };
