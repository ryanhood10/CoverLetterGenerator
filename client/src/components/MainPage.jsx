import { useState, useRef } from "react";
import { ThreeDots } from 'react-loader-spinner';

function MainPage() {
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [skills, setSkills] = useState("");
  const [companyValues, setCompanyValues] = useState("");
  const [jobListing, setJobListing] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const coverLetterRef = useRef(null);

  const handleGenerateCoverLetter = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message:
          "Create me a concise cover letter for the " +
          position +
          " at " +
          company +
          ". The cover letter should be in the following format:" +
          "1. Salutation" +
          "2. Introduction and interest in the position and company" +
          "3. Summary of relevant skills and experiences: " +
          skills +
          "4. Explanation of how my values align with the company's values: " +
          companyValues +
          "5. Closing and contact information" +
          "Here is the job listing for reference: " +
          jobListing +
          ". Please keep the letter professional, engaging, and no more than a few paragraphs long.",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://cover-letter-generator-ai-b7323a56ca78.herokuapp.com/completions",
        options
      );
      const data = await response.json();
      const messageContent = data.choices[0].message?.content || data.choices[0].message || "";
      setCoverLetter(messageContent);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to generate cover letter:", error);
      setIsLoading(false);
    }
  };

  const handleGenerateNewCoverLetter = async () => {
    setIsLoading(true);

    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          message:
            "Create me a concise cover letter for the " +
            position +
            " at " +
            company +
            ". The cover letter should be in the following format:" +
            "1. Salutation" +
            "2. Introduction and interest in the position and company" +
            "3. Summary of relevant skills and experiences: " +
            skills +
            "4. Explanation of how my values align with the company's values: " +
            companyValues +
            "5. Closing and contact information" +
            "Here is the job listing for reference: " +
            jobListing +
            ". Please keep the letter professional, engaging, and no more than a few paragraphs long.",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        "https://cover-letter-akira-backend-b62c253075b0.herokuapp.com/completions",
        options
      );
      const data = await response.json();
      const messageContent = data.choices[0].message?.content || data.choices[0].message || "";
      setCoverLetter(messageContent);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to generate cover letter:", error);
      setIsLoading(false);
    }
  };

  const handleCopyCoverLetter = async () => {
    if (coverLetterRef.current) {
      const el = coverLetterRef.current;
      try {
        await navigator.clipboard.writeText(el.innerText);
        alert("Cover Letter Copied to Clipboard!");
      } catch (error) {
        console.error("Failed to copy text to clipboard:", error);
      }
    }
  };

  const formatCoverLetter = (text) => {
    if (typeof text !== 'string') return text;

    const formattedText = text
      .replace(/(Dear .+?,)/, "<h2 class='text-xl font-bold my-2'>$1</h2>")
      .replace(/(Sincerely,)/, "<h2 class='text-xl font-bold my-2'>$1</h2>")
      .replace(/(\[.+?\])/g, "<span class='font-bold'>$1</span>")
      .replace(/\n/g, "<br />");

    return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center pt-32 md:pt-56">
      <div className="bg-white p-8 rounded-xl shadow-xl w-[80%]">
        <h1 className="text-4xl font-bold text-center">
          ⭐ Cover Letter Generator ⭐
        </h1>
        <h2 className="mb-6 text-lg font-light">powered by ChatGPT</h2>

        <div className="mb-4">
          <label className="block font-medium mb-2">What is the position?</label>
          <input
            className="input-large bg-gray-200 rounded-lg w-1/2 shadow-sm resize-y"
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Company Name:</label>
          <input
            className="input-large bg-gray-200 rounded-lg shadow-sm w-1/2 resize-y"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">
            What are your skills and/or past experiences relevant to this
            position?
          </label>
          <textarea
            className="input-large bg-gray-200 rounded-lg shadow-sm resize-y h-24 w-3/4"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">What are the company values?</label>
          <textarea
            className="input-large bg-gray-200 rounded-lg shadow-sm resize-y h-24 w-3/4"
            value={companyValues}
            onChange={(e) => setCompanyValues(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-2">Copy and paste job listing here:</label>
          <textarea
            className="input-large bg-gray-200 w-3/4 rounded-lg shadow-sm resize-y h-24"
            value={jobListing}
            onChange={(e) => setJobListing(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-full font-medium text-center w-3/4"
          onClick={handleGenerateCoverLetter}
        >
          Generate Cover Letter
        </button>
        {isLoading && (
          <div className="flex items-center mt-4">
            <ThreeDots
              type="ThreeDots"
              color="#00BFFF"
              height={80}
              width={80}
              className="mr-2"
            />
            <p>Loading...</p>
          </div>
        )}
        <h2 className="text-2xl font-semibold mt-6">Generated Cover Letter:</h2>
        <div className="h-full flex flex-col justify-center items-center">
          <div className="border p-4 mt-2 rounded-xl shadow-xl w-3/4 flex flex-col justify-center items-center relative">
            <div className="h-full flex flex-col overflow-y-auto justify-center items-center">
              <div className="flex-grow p-8" ref={coverLetterRef}>
                {formatCoverLetter(coverLetter)}
              </div>
              <div className="absolute bottom-2 right-2">
                <button
                  className="bg-green-500 text-white hover:bg-green-600 py-2 px-6 rounded-full font-medium"
                  onClick={handleCopyCoverLetter}
                >
                  Copy
                </button>
              </div>
              <div className="absolute bottom-2 left-2">
                <button
                  className="bg-green-500 text-white hover:bg-green-600 py-2 px-6 rounded-full font-medium"
                  onClick={handleGenerateNewCoverLetter}
                >
                  Generate New
                </button>
              </div>
            </div>
          </div>
        </div>
        <p className="text-red-400 pt-8 text-center">
          Please note that there is a rough 750 word character limit on the full
          response of this form (the total of all fields).
          <br />
          Response time is based off of ChatGPT's network speed.
          <br />
          * If the "Generate Cover Letter" button does not return a response, it
          is because your prompt is too long, or ChatGPT is too busy to perform
          a request at this time.
        </p>
      </div>
    </div>
  );
}

export default MainPage;
