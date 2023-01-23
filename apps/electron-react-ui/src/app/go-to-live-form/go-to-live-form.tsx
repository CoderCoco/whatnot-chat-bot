import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {useState} from "react";
import {events, logger} from "../main-world-functions";

export default function GoToLiveForm() {
  const [value, setValue] = useState<string>();

  const goLiveClicked = async () => {
    logger.silly("Entered the go live click method")

    if (value == null) return;

    const trimmedValue = value.trim();

    if (trimmedValue == "") return;

    logger.debug(`Go live button clicked with ${trimmedValue}`);
    await events.goToLink(trimmedValue);
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
