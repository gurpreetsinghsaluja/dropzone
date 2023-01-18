import React, { useMemo } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "LightGray",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "blue",
};

const acceptStyle = {
  borderColor: "green",
};

const rejectStyle = {
  borderColor: "red",
};
const root = ReactDOM.createRoot(document.getElementById("root"));
function DropzoneComponent() {
  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ autoFocus: false }, { multiple: true });

  const acceptedFileItems = acceptedFiles.map((file, index) => (
    <div>
      <input
        type="checkbox"
        id={index}
        name={"fileName" + index}
        value={file.size}
      ></input>
      <label for={"file" + { index }}>
        {" "}
        {file.path} - {file.size} bytes{" "}
      </label>
      <progress id={"progressbar" + index} max="100"></progress>
      <br></br>
    </div>
  ));

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  const func = () => {
    document.getElementById("Custodian").value = "";
    for (
      let i = 1;
      i < document.getElementsByTagName("input").length - 1;
      i++
    ) {
      let temp = document.getElementsByTagName("input")[i];
      if (temp.checked) {
        let progress = document.getElementById("progressbar" + (i - 1));
        var a = setInterval(function () {
          progress.value = progress.value + 1;

          if (progress.value == 100) {
            clearInterval(a);
          }
        }, temp.value / 50000);
      }
    }
  };
  function ReturnFiles() {
    return acceptedFileItems;
  }
  function ReturnCustodian() {
    if (acceptedFiles.length > 0)
      return (
        <div>
          <label for="Custodian">Enter Custodian:</label>
          <input type="text" id="Custodian" name="Custodian" />
          <br></br>
          <button onClick={() => func()}>Submit</button>
        </div>
      );
  }
  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <acc>
        <ReturnFiles />
        <ReturnCustodian />
      </acc>
    </div>
  );
}
root.render(
  <React.StrictMode>
    <DropzoneComponent />
  </React.StrictMode>
);
