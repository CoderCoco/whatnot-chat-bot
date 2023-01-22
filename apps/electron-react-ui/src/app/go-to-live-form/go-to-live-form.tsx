import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {useState} from "react";
import {logger} from "../logging";

export default function GoToLiveForm() {
  const [value, setValue] = useState<string>();

  const goLiveClicked = () => {
    logger.debug(`Go live button clicked with ${value}`);
  };

  return (
    <>
      <span style={{marginRight: "15px"}}>
        <InputText id="go-live-link" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Live Link" />
      </span>
      <span><Button label="Go" onClick={goLiveClicked}></Button></span>
    </>
  )
}
