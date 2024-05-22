import React, { useEffect, useRef, useState } from "react";
import PreviousPageButton from "./PreviousPageButton";

const FixListNo = ({}) => {
  // Check page path if !X return THIS IS NOT THE CORRECT PAGE
  const [number, setNumber] = useState("0");
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    // Get number from page
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var activeTab = tabs[0];
      if (activeTab.id) {
        chrome.tabs.sendMessage(
          activeTab.id,
          { action: "FIX_NO", data: { number } },
          function (response) {
            if (buttonRef.current) {
              const oldContent = buttonRef.current.textContent;
              buttonRef.current.textContent = response;
              setTimeout(() => {
                buttonRef.current!.textContent = oldContent;
              }, 3000);
            }
          }
        );
      }
    });
  };
  return (
    <div className="w-[200px] h-[300px] p-3 flex flex-col">
      <PreviousPageButton />
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="fix-list" className="pb-1 text-base">
          Çeki No
        </label>
        <input
          value={number}
          onChange={(e) => setNumber(e.currentTarget.value)}
          id="fix-list"
          name="number"
          type="number"
          className="rounded-md border-2 p-1 mb-1 w-full"
        />
        <button
          ref={buttonRef}
          className="text-black w-full py-2 border-2 rounded-md focus-visible:bg-black focus-visible:text-white hover:bg-black hover:text-white transition"
        >
          Düzelt
        </button>
      </form>
    </div>
  );
};

export default FixListNo;
