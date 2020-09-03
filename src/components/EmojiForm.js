import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../styles/Form.css";

const emojiRegex = /.*(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])+.*/;

const API_url = process.env.REACT_APP_API_URL || "http://localhost:4000/api";
const headers = { "content-type": "application/json" };
const params = {
  headers: headers,
  mode: "cors",
  cache: "default",
};

function disableButton() {
  document.getElementById("submitButton").disabled = true;
}

function enableButton() {
  document.getElementById("submitButton").disabled = false;
}

// This is disgusting I know...
function populateMessage(values) {
  let message = document.getElementById("validationMessage");
  if (values.message) {
    message.innerHTML = `
      <div>${values.message}</div>
    `;
  } else {
    message.innerHTML = `
      <span>Your link: </span>
      <a href=${values.url}>${values.display}</a>
    `;
  }
}

const EmojiForm = () => {
  return (
    <>
      <Formik
        initialValues={{ url: "", emojis: undefined }}
        validationSchema={Yup.object({
          url: Yup.string().url("Must be a valid url").required("Required"),
          emojis: Yup.string()
            .notRequired()
            .matches(emojiRegex, "must contain at least one emoji..."),
        })}
        onSubmit={async (values) => {
          disableButton();
          let body = JSON.stringify(values);
          await fetch(`${API_url}/newURL`, {
            method: "POST",
            ...params,
            body: body,
          })
            .then((response) => {
              console.log("response", response);
              if (response.ok) {
                return response.json();
              } else {
                let obj = {raw: "", emojis: ""}
                switch(response.status) {
                  case 429:
                    obj.message = "You are submitting too fast.";
                    break;
                  case 444:
                    obj.message = "Oops, that emoji sequence is already in use...";
                    break;
                  case 555:
                    obj.message = "The emoji string must have at least 1 emoji";
                    break;
                  default:
                    throw Error(response.error)
                }
                return obj
              }
            })
            .then((data) => {
              let obj = {
                url: `/${data.emojis}`,
                display: `emoj.yt/${data.raw}`,
              };
              if (data.message) {
                obj.message = data.message;
              }
              populateMessage(obj);
              enableButton();
            })
            .catch((error) => {
              alert(`${error.message}`);
              enableButton();
            });
        }}
      >
        <Form style={{ width: "100%" }}>
          <div className="formContainer">
            <div className="fieldContainer">
              <label htmlFor="url">URL</label>
              <Field name="url" type="url" placeholder="url.domain.tld" />
              <ErrorMessage name="url">
                {(msg) => <div className="errorMessage">{msg}</div>}
              </ErrorMessage>
            </div>
            <div className="fieldContainer">
              <label htmlFor="emojis">emojis</label>
              <Field name="emojis" type="text" placeholder="emojis here..." />
              <ErrorMessage name="emojis">
                {(msg) => <div className="errorMessage">{msg}</div>}
              </ErrorMessage>
            </div>
            <div className="buttonContainer">
              <button type="submit" id="submitButton">
                Submit
              </button>
            </div>
          </div>
        </Form>
      </Formik>
      <div id="validationMessage"></div>
    </>
  );
};

export default EmojiForm;
