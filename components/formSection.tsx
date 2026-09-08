"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { themePalette } from "@/lib/palette";
import axios from "axios";
import { BEendpoints } from "@/constants/urls/backendUrls";
import { toast } from "sonner";

export default function FormSection() {
  const { resolvedTheme } = useTheme();
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [showError, setShowError] = useState({
    name: false,
    email: false,
    phoneNumber: false,
    subject: false,
    message: false,
  });

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (
      fields.name &&
      fields.email &&
      fields.phoneNumber &&
      fields.message &&
      fields.subject
    ) {
      if (
        showError.name === false &&
        showError.email === false &&
        showError.phoneNumber === false &&
        showError.message === false &&
        showError.subject === false
      ) {
        try {
          setLoading(true);
          const res = await axios.post(BEendpoints.send_mail, fields);
          toast.success(res.data.message || "Form submitted");
          setFields({
            name: "",
            email: "",
            phoneNumber: "",
            subject: "",
            message: "",
          });
        } catch (err) {
          toast.error(
            err instanceof Error
              ? err.message
              : "couldn't submit...please retry later",
          );
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleFormChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({
      ...prev,
      name: e.target.value,
    }));
    if (e.target.value === "")
      setShowError({
        ...showError,
        name: true,
      });
    else
      setShowError({
        ...showError,
        name: false,
      });
  };

  const handleFormChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      email: e.target.value,
    });
    if (
      e.target.value === "" ||
      !e.target.value.includes("@") ||
      !e.target.value.includes(".")
    )
      setShowError({
        ...showError,
        email: true,
      });
    else
      setShowError({
        ...showError,
        email: false,
      });
  };

  const handleFormChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      phoneNumber: e.target.value,
    });
    if (e.target.value === "" || isNaN(Number(e.target.value)))
      setShowError({
        ...showError,
        phoneNumber: true,
      });
    else
      setShowError({
        ...showError,
        phoneNumber: false,
      });
  };

  const handleFormChange4 = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFields({
      ...fields,
      message: e.target.value,
    });
    if (e.target.value === "")
      setShowError({
        ...showError,
        message: true,
      });
    else
      setShowError({
        ...showError,
        message: false,
      });
  };

  const handleFormChange5 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFields({
      ...fields,
      subject: e.target.value,
    });
    if (e.target.value === "")
      setShowError({
        ...showError,
        subject: true,
      });
    else
      setShowError({
        ...showError,
        subject: false,
      });
  };

  return (
    <>
      <section
        className={`flex flex-col md:flex-row gap-y-5 md:gap-y-0 gap-x-7 items-center justify-center py-20 ${resolvedTheme === "dark" ? themePalette.dark.backgroundPrimary : themePalette.light.bg_secondary}`}
      >
        <div
          className={`w-[80%] md:w-[32%] shadow-md rounded-sm p-4 ${resolvedTheme === "dark" ? themePalette.dark.bg_secondary : themePalette.light.backgroundPrimary}`}
        >
          <h1
            className={`text-[1.4rem] font-medium ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
          >
            Get in touch
          </h1>
          <p
            className={`text-black/80 my-1.5 ${resolvedTheme === "dark" ? themePalette.dark.paragraph_text_lighter : themePalette.light.paragraph_text_lighter}`}
          >
            Have questions for us? Do not hesitate to contact us!
          </p>
          <ul
            className={`mt-6 flex flex-col justify-center gap-y-2 ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
          >
            <li className="flex gap-x-1.5">
              <svg
                className="w-5 stroke-amber-500 fill-amber-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
              >
                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
              </svg>
              Grtechservices2@gmail.com
            </li>
            <li className="flex gap-x-1.5">
              <svg
                className="w-4 stroke-amber-500 fill-amber-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M23 16.92c0.016-0.714-0.236-1.404-0.673-1.943-0.46-0.566-1.129-0.967-1.925-1.080-0.8-0.098-1.695-0.314-2.586-0.646-0.433-0.159-0.893-0.218-1.344-0.174-0.663 0.064-1.307 0.349-1.819 0.855l-0.72 0.72c-1.77-1.117-3.36-2.667-4.583-4.589l0.726-0.726c0.322-0.33 0.563-0.726 0.707-1.156 0.212-0.632 0.214-1.336-0.039-2.011-0.289-0.753-0.518-1.644-0.644-2.595-0.104-0.714-0.456-1.345-0.963-1.804-0.539-0.486-1.256-0.779-2.027-0.771h-2.996c-0.088 0-0.182 0.004-0.273 0.012-0.824 0.075-1.542 0.478-2.033 1.066s-0.758 1.367-0.683 2.199c0.3 3.076 1.365 6.243 3.216 9.102 1.502 2.413 3.648 4.623 6.298 6.306 2.568 1.697 5.684 2.862 9.086 3.231 0.092 0.009 0.191 0.013 0.288 0.013 0.828-0.003 1.578-0.343 2.118-0.887s0.873-1.297 0.87-2.121zM21 16.92v3c0.001 0.28-0.109 0.53-0.29 0.712s-0.429 0.295-0.706 0.296c-3.149-0.336-5.961-1.391-8.263-2.912-2.428-1.543-4.359-3.537-5.702-5.694-1.697-2.62-2.655-5.481-2.924-8.238-0.024-0.268 0.064-0.526 0.229-0.724s0.403-0.33 0.678-0.355l3.088-0.005c0.271-0.003 0.507 0.094 0.687 0.256 0.17 0.154 0.288 0.366 0.323 0.608 0.142 1.072 0.408 2.117 0.757 3.025 0.081 0.216 0.080 0.447 0.010 0.658-0.049 0.145-0.131 0.281-0.242 0.395l-1.262 1.261c-0.324 0.324-0.379 0.814-0.162 1.201 1.584 2.785 3.839 4.957 6.381 6.378 0.397 0.222 0.882 0.144 1.195-0.166l1.27-1.27c0.166-0.164 0.377-0.257 0.598-0.279 0.152-0.015 0.31 0.005 0.459 0.060 1.022 0.381 2.070 0.636 3.034 0.754 0.241 0.034 0.462 0.166 0.615 0.355 0.147 0.181 0.231 0.412 0.226 0.682z"></path>
              </svg>
              +234 80 9169 1064
            </li>
            <li className="flex gap-x-1.5">
              <svg
                className="fill-amber-500 stroke-amber-500 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
              >
                <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
              </svg>
              Lagos State, Nigeria
            </li>
          </ul>
        </div>

        <div
          className={`w-[85%] md:w-[48%] lg:w-[35%] shadow-md rounded-sm p-6 ${resolvedTheme === "dark" ? themePalette.dark.bg_secondary : themePalette.light.backgroundPrimary}`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label id="name" className="flex flex-col">
                <span
                  className={`${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
                >
                  Name
                </span>
                <input
                  value={fields.name}
                  onChange={(e) => handleFormChange1(e)}
                  aria-labelledby="name"
                  type="text"
                  className={`rounded-md p-1.5 focus:outline-indigo-500 ${resolvedTheme === "dark" ? themePalette.dark.input_bg : themePalette.light.input_bg}`}
                ></input>
              </label>
              {showError.name && (
                <span className="text-red-500 text-sm">
                  Please enter a value
                </span>
              )}
            </div>

            <div>
              <label id="email" className="flex flex-col">
                <span
                  className={`${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
                >
                  Email
                </span>
                <input
                  value={fields.email}
                  onChange={(e) => handleFormChange2(e)}
                  aria-labelledby="email"
                  type="email"
                  className={`rounded-md p-1.5 focus:outline-indigo-500 ${resolvedTheme === "dark" ? themePalette.dark.input_bg : themePalette.light.input_bg}`}
                ></input>
              </label>
              {showError.email && (
                <span className="text-red-500 text-sm">
                  Please enter a valid email
                </span>
              )}
            </div>

            <div>
              <label id="phoneNumber" className="flex flex-col">
                <span
                  className={`${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
                >
                  Phone Number
                </span>
                <input
                  value={fields.phoneNumber}
                  onChange={(e) => handleFormChange3(e)}
                  aria-labelledby="phoneNumber"
                  type="number"
                  className={`rounded-md p-1.5 focus:outline-indigo-500 ${resolvedTheme === "dark" ? themePalette.dark.input_bg : themePalette.light.input_bg}`}
                ></input>
              </label>
              {showError.phoneNumber && (
                <span className="text-red-500 text-sm">
                  Please enter a valid phoneNumber number
                </span>
              )}
            </div>

            <div>
              <label
                className={`block text-sm font-medium mb-2 ${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
              >
                Subject <span className="text-red-500"> *</span>
              </label>
              <select
                name="subject"
                value={fields.subject}
                onChange={handleFormChange5}
                required
                className={`w-full px-4 py-3 rounded-lg transition-colors ${resolvedTheme === "dark" ? `${themePalette.dark.input_bg} ${themePalette.light.text_dark}` : `${themePalette.light.input_bg} ${themePalette.light.text_dark}`}`}
              >
                <option value="">Select a subject</option>
                <option value="residential">Residential Solar</option>
                <option value="commercial">Commercial Solar</option>
                <option value="support">Technical Support</option>
                <option value="other">Other Inquiry</option>
              </select>
              {showError.subject && (
                <span className="text-red-500 text-sm">
                  Please pick an option
                </span>
              )}
            </div>

            <div>
              <label id="message" className="flex flex-col">
                <span
                  className={`${resolvedTheme === "dark" ? themePalette.dark.paragragh_text : themePalette.light.paragragh_text}`}
                >
                  Message
                </span>
                <textarea
                  value={fields.message}
                  onChange={(e) => handleFormChange4(e)}
                  aria-labelledby="message"
                  className={`rounded-md p-1.5 focus:outline-indigo-500 ${resolvedTheme === "dark" ? themePalette.dark.input_bg : themePalette.light.input_bg}`}
                ></textarea>
              </label>
              {showError.message && (
                <span className="text-red-500 text-sm">
                  Please type in something
                </span>
              )}
            </div>

            <button
              className="border w-full my-4 bg-amber-500 hover:bg-amber-600
                         active:bg-amber-700 text-white py-1 disabled:bg-amber-300 cursor-pointer
                         disabled:cursor-default"
              disabled={
                fields.name === "" ||
                fields.email === "" ||
                fields.phoneNumber === "" ||
                fields.message === "" ||
                fields.subject === "" ||
                showError.name === true ||
                showError.email === true ||
                showError.phoneNumber === true ||
                showError.message === true ||
                showError.subject === true ||
                loading
              }
            >
              {loading ? "loading..." : "Send"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
