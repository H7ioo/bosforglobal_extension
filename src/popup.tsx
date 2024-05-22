import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Link, Route, MemoryRouter as Router, Routes } from "react-router-dom";
import FixListNo from "./components/FixListNo";
import "./style.css";
import { cn } from "./utils";

const PAGES = [
  {
    pageName: "goods_packing_list_per_company_view",
    path: "/fix-list-no",
    name: "List Çeki Düzelt",
  },
] as const;

const Popup = () => {
  const [currentPage, setCurrentPage] = useState<string | undefined>(undefined);

  useEffect(() => {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var activeTab = tabs[0];
      if (activeTab.id) {
        chrome.tabs.sendMessage(
          activeTab.id,
          { action: "GET_PAGE" },
          function (response) {
            setCurrentPage(response);
          }
        );
      }
    });
  }, []);

  return (
    <div className="w-[200px] h-[300px] p-3">
      <h1 className="text-3xl pb-2">İşlemler</h1>
      <ul>
        {PAGES.map((page) => {
          return (
            <li
              className={cn("before:content-['>_'] text-base")}
              key={page.pageName}
            >
              <Link
                to={currentPage === page.pageName ? page.path : "#"}
                className={cn("underline", {
                  "line-through": !(currentPage === page.pageName),
                })}
              >
                Liste Çeki Düzelt
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Popup />}></Route>
        <Route path="/fix-list-no" element={<FixListNo />}></Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
