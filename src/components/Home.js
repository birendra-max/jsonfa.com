import React, { useState } from "react";


export default function Home() {
    const [text, setText] = useState('');
    const [CopyedText, setCopyedText] = useState('none');
    const [alertValue, setAlertValue] = useState('')
    const [alertType, setAlertType] = useState();
    function setTextValue(event) {
        setText(event.target.value)
    }
    function ClearText() {
        if (text === '') {
            setCopyedText("block");
            setAlertValue('No JSON text is available for Clear. !')
            setAlertType('alert alert-danger')
            disableAlert();
        }
        else {
            setText('')
            setCopyedText("block");
            setAlertValue('The input box has been cleared successfully—please verify.')
            setAlertType('alert alert-success')
            disableAlert();
        }
    }

    async function CopyText() {
        try {
            await navigator.clipboard.writeText(text)
            const x = await navigator.clipboard.readText()
            if (x !== '') {
                setCopyedText("block");
                setAlertValue('The text has been copied successfully—please confirm.')
                setAlertType('alert alert-success')
                disableAlert();
            }
            else {
                setCopyedText("block");
                setAlertValue('Enter your JSON text to copy it !')
                setAlertType('alert alert-danger')
                disableAlert();
            }
        }
        catch (err) {
            setCopyedText("block");
            setAlertValue('Failed to copy or read text:', err)
            setAlertType('alert alert-danger')
            disableAlert();

        }
    }

    function toUpperCase() {
        if (text === '') {
            setCopyedText("block")
            setAlertValue('Provide your JSON text for conversion to uppercase !')
            setAlertType('alert alert-danger')
            disableAlert();
        }
        else {
            setText(text.toUpperCase())
            setCopyedText("block")
            setAlertValue('The JSON text has been converted to uppercase!')
            setAlertType('alert alert-success')
            disableAlert();
        }
    }

    function toLowerCase() {
        if (text === '') {
            setCopyedText("block")
            setAlertValue('Submit your JSON text to convert it to lowercase !')
            setAlertType('alert alert-danger')
            disableAlert();
        }
        else {
            setText(text.toLowerCase())
            setCopyedText("block")
            setAlertValue('The JSON text has been converted to lowercase!')
            setAlertType('alert alert-success')
            disableAlert();
        }
    }

    function removeQuotes() {
        if (text === '') {
            setCopyedText("block")
            setAlertValue('Submit your JSON text to remove quotes. !')
            setAlertType('alert alert-danger')
            disableAlert();
        }
        else {
            setText(text.replace(/['"]/g, ''));
            setCopyedText("block")
            setAlertValue('The JSON text has been removed quotes. !')
            setAlertType('alert alert-success')
            disableAlert();
        }
    }


    function lineByline() {

        if (text === '') {
            setCopyedText("block")
            setAlertValue('Submit your JSON text to convert line-by-line. !')
            setAlertType('alert alert-danger')
            disableAlert();
        }
        else {
            const jsonData = text;
            const data = JSON.parse(jsonData);
            const formattedJson = data.map(item => {
                const formattedLines = Object.entries(item).map(([key, value]) => {
                    return `"${key}": ${JSON.stringify(value, null, 2)}`;
                });
                return `{ ${formattedLines.join(', ')} }`;
            }).join('\n');

            setText(formattedJson);
            setCopyedText("block")
            setAlertValue('The JSON text has been formated line-by-line. !')
            setAlertType('alert alert-success')
            disableAlert(); 
        }
    }

    function disableAlert() {
        setTimeout(() => {
            setCopyedText('none');
        }, 4000);
    }

    return (
        <>
            <form className="container">
                <div className="mb-3 mt-4">
                    <div className={alertType} role="alert" id="alert" style={{ display: CopyedText }}>
                        {alertValue}
                    </div>
                    <div id="header">
                        <label htmlFor="exampleInputEmail1" className="form-label fw-bold fs-5 border-bottom border-5 border-success">JSON Formater App </label>
                        <select placeholder="select you font" style={{ padding: "5px", cursor: "pointer" }}>
                            <option selected disabled>Select Your font</option>
                            <option>Action</option>
                            <option>Action</option>
                        </select>
                    </div>
                    <textarea style={{ width: "100%", height: "50vh", padding: "1%" }} value={text} onChange={setTextValue}>

                    </textarea>
                </div>
                <div id="buttonCont">
                    <button type="button" className="btn btn-info rounded-0 shadow-lg ms-2" onClick={toUpperCase}>To Upper Case</button>
                    <button type="button" className="btn btn-info rounded-0 shadow-lg ms-2" onClick={toLowerCase}>To Lower Case</button>
                    <button type="button" className="btn btn-warning rounded-0 shadow-lg ms-2" onClick={ClearText}>Clear Text</button>
                    <button type="button" className="btn btn-warning rounded-0 shadow-lg ms-2" onClick={CopyText}>Copy Text</button>
                    <button type="button" className="btn btn-warning rounded-0 shadow-lg ms-2" onClick={removeQuotes}>Remove Quotes</button>
                    <button type="button" className="btn btn-warning rounded-0 shadow-lg ms-2" onClick={lineByline}>Line-by-line</button>
                </div>

            </form>
        </>
    )
}