"use client";

import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { FormEvent, useRef, useState } from "react";

function NewsletterForm() {
  const [input, setInput] = useState("");
  const [successMessage, setSuccessMessage] =
    useState<MembersSuccessResponse>();
  const [errorMessage, setErrorMessage] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = input;
    const button = buttonRef.current;

    if (!email || !button) return;

    const res = await fetch("/api/addSubscription", {
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    const data = await res.json();

    if (data.error) {
      setErrorMessage("Hey, you are already subscribed!");
      setSuccessMessage(undefined);
      return;
    }

    setSuccessMessage(data.res);
    setErrorMessage("");
  };

  const dismissMessages = () => {
    setSuccessMessage(undefined);
    setErrorMessage("");
  };

  return (
    <div className="flex flex-col space-y-4 md:w-[450px]">
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="flex items-center gap-x-3 py-3 px-4 rounded-lg bg-[#F3F3FF]">
          <EnvelopeIcon className="w-6 h-6 text-black" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Email address"
            required
            type="email"
            className="flex-1 text-black text-base bg-transparent outline-none placeholder-white::placeholder rounded h-12 px-3"
          />
          <button
            ref={buttonRef}
            className="text-sm  bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded"
            disabled={!input}
            type="submit"
          >
            Subscribe
          </button>
        </div>
      </form>

      {(successMessage || errorMessage) && (
        <div className={`flex items-center space-x-2 rounded py-2 px-4 text-white ${successMessage ? 'bg-green-500' : 'bg-red-500'}`}>
          <CheckIcon className="h-4 w-4" />
          <div className="text-xs">
            {successMessage ? (
              <p>We&apos;ve added {successMessage.email_address} to our waitlist.</p>
            ) : (
              <p>You are already on our waitlist.</p>
            )}
          </div>
          <XMarkIcon className="h-4 w-4 cursor-pointer" onClick={dismissMessages} />
        </div>
      )}
    </div>
  );
}

export default NewsletterForm;