"use client";

import { getPlaneKeyframes } from "@/lib/getPlaneKeyframes";
import { getTrailsKeyframes } from "@/lib/getTrailsKeyframes";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { gsap } from "gsap";
import { FormEvent, useRef, useState } from "react";

function NewsletterForm() {
  const [input, setInput] = useState("");
  const [successMessage, setSuccessMessage] =
    useState<MembersSuccessResponse>();
  const [errorMessage, setErrorMessage] = useState("");
  const [active, setActive] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { to, fromTo, set } = gsap;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = input;
    const button = buttonRef.current;

    if (!email || !button) return;

    if (!active) {
      setActive(true);

      to(button, {
        keyframes: getPlaneKeyframes(set, fromTo, button, setActive, setInput),
      });

      to(button, { keyframes: getTrailsKeyframes(button) });
    }

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
    <div className="flex flex-col space-y-4 md:w-[300px]">
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="flex items-center gap-x-3 py-1 px-3 rounded bg-[#090D11]">
          <EnvelopeIcon className="w-5 h-5 text-[#4B4C52]" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Email address"
            required
            type="email"
            className="flex-1 text-white text-sm bg-transparent outline-none placeholder-[#4B4C52]"
          />
          <button
            ref={buttonRef}
            className="text-sm"
            disabled={!input}
            type="submit"
          >
            Subscribe
          </button>
        </div>
      </form>

      {(successMessage || errorMessage) && (
        <div className="flex items-center space-x-2 bg-[#0A0E12] text-white rounded py-2 px-4">
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