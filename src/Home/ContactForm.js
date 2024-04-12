import React, { useState } from "react";
import "./ContactForm.css"; // Import your CSS file
import { sendForm } from "@emailjs/browser";
import { useRef } from "react";
import validator from "validator";
import {
  faGoogle,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID } from "../services/helper";

function ContactForm(props) {
  const { handleSubmitForm } = props;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageInProgress, setMessageInProgress] = useState(false);
  const form = useRef();

  const handleSubmit = (e) => {
    if(messageInProgress){
      return;
    }
    e.preventDefault();
    setMessageInProgress(true);
    try{
      if(name.length < 2){
        throw Error("Name length at least 2");
      }
      else if(!validator.matches(name,/^[a-zA-Z]+$/)){
        throw Error("Name only contains alphabets");
      }
      else if(!validator.isEmail(email)){
        throw Error("Must be an email");
      }
      else if(message.length < 5){
        throw Error("Message length at least 5");
      }
    }
    catch(err){
      alert(err.message);
      setMessageInProgress(false);
      return;
    }
      sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form.current, {
        publicKey: EMAILJS_PUBLIC_KEY,
      })
      .then(
        () => {
          toast.success("Message Sent Successfully");
          setMessageInProgress(false);
          setFieldNull();
        },
        (error) => {
          toast.error("Something Went Wrong");
          setMessageInProgress(false);
        },
      );
    handleSubmitForm(
      { name: name, email: email, message: message }
    );
  };

  const setFieldNull = () => {
    // Reset form fields after submission
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div id="contact">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-4">
          <div className="mb-5 max-w-3xl text-center sm:text-center md:mx-auto">
            <h2 className="font-heading mb-4 font-bold tracking-tight text-gray-900 text-3xl sm:text-5xl">
              Get in Touch
            </h2>
          </div>
        </div>
        <div className="flex items-stretch justify-center">
          <div className="grid md:grid-cols-2 w-full">
            <div className="h-full pr-6 md:pt-10 md:pl-5 overflow-wrap-anywhere">
              <ul className="mb-6 md:mb-0 sm:pl-5 pl-0">
                <li className="flex mb-4">
                  <div className="flex md:h-10 h-8 md:min-w-10 items-center justify-center rounded bg-blue-900 text-gray-50 min-w-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                      <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                    </svg>
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900">
                      Our Social
                    </h3>
                    <div className="flex justify-between mt-2">
                      <a href="https://www.linkedin.com/in/sumitkhohal/" target="_blank">
                        <FontAwesomeIcon
                          icon={faLinkedin}
                          size="lg"
                          className="hover:cursor-pointer"
                        />
                      </a>
                      <a href="mailto:vk783838@gmail.com" target="_blank">
                        <FontAwesomeIcon
                          icon={faGoogle}
                          size="lg"
                          className="hover:cursor-pointer"
                        />
                      </a>
                      <a href="https://x.com/sumitkhohal?t=hinVbngOQFTYTtKKXHtIYQ&s=08" target="_blank">
                        <FontAwesomeIcon
                          icon={faTwitter}
                          size="lg"
                          className="hover:cursor-pointer"
                        />
                      </a>
                    </div>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex md:h-10 h-8 md:min-w-10 items-center justify-center rounded bg-blue-900 text-gray-50 min-w-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                      <path d="M15 7a2 2 0 0 1 2 2"></path>
                      <path d="M15 3a6 6 0 0 1 6 6"></path>
                    </svg>
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900">
                      Contact
                    </h3>
                    <div className="text-gray-600 flex mb-4 sm:flex-row flex-col">
                      <div className="w-14">Mobile:</div>
                      <div className="flex-col ml-1">
                        <div>+91 9310139949</div>
                        <div>+91 9868956310</div>
                      </div>
                    </div>
                    <div className="text-gray-600 flex sm:flex-row flex-col">
                      <div className="w-14">Mail:</div>
                      <div className="flex-col ml-1">
                        <div>vk783838@gmail.com</div>
                        <div>khohalsumit@gmail.com</div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex md:h-10 h-8 md:min-w-10 items-center justify-center rounded bg-blue-900 text-gray-50 min-w-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                      <path d="M12 7v5l3 3"></path>
                    </svg>
                  </div>
                  <div className="ml-4 mb-4">
                    <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900">
                      Working hours
                    </h3>
                    <p className="text-gray-600">
                      Monday - Friday: 08:00 - 17:00
                    </p>
                    <p className="text-gray-600">
                      Saturday &amp; Sunday: 08:00 - 12:00
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className=" h-fit max-w-6xl p-0 md:p-12" id="form">
              <h2 className="mb-2 text-base font-semibold">
                Have you any query?
              </h2>
              <form id="contactForm" ref={form} onSubmit={handleSubmit}>
                <div className="mb-6">
                  <div className="mx-0 mb-1 sm:mb-4">
                    <div className="mx-0 mb-1 sm:mb-4">
                      <label
                        htmlFor="name"
                        className="pb-1 text-xs uppercase tracking-wider"
                      ></label>
                      <input
                        type="text"
                        id="name"
                        autoComplete="given-name"
                        placeholder="Your name"
                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md sm:mb-0"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="mx-0 mb-1 sm:mb-4">
                      <label
                        htmlFor="email"
                        className="pb-1 text-xs uppercase tracking-wider"
                      ></label>
                      <input
                        type="email"
                        id="email"
                        autoComplete="email"
                        placeholder="Your email address"
                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md sm:mb-0"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mx-0 mb-1 sm:mb-4">
                    <label
                      htmlFor="textarea"
                      className="pb-1 text-xs uppercase tracking-wider"
                    ></label>
                    <textarea
                      id="textarea"
                      name="message"
                      cols="30"
                      rows="5"
                      placeholder="Write your message..."
                      className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md sm:mb-0"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="w-full bg-blue-800 text-white px-6 py-3 font-xl rounded-md sm:mb-0"
                  >
                    {messageInProgress ? <>Sending...</> : <>Send Message</>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
