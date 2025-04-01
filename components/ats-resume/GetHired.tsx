"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import app from "@/firebase/config";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { toast } from "react-toastify";
import { ref, get, getDatabase } from "firebase/database";
import { pdfjs, Document, Page } from "react-pdf";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Modal from "@/app/Modal"; // Adjust the import path as necessary

export default function GetHired() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobData, setJobData] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [pdfText, setPdfText] = useState("");
  const [ats, setAts] = useState(null);
  const [buildLoading, setBuildLoading] = useState(false); // Separate loading state for building
  const [analyzeLoading, setAnalyzeLoading] = useState(false)
  // const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [atsData, setAtsData] = useState(null);
  const [skill, setSkill] = useState(null);
  const [build, setBuild] = useState(false)
  const [actionType, setActionType] = useState<"build" | "analyze" | null>(null);
  const db = getDatabase(app);
  const auth = getAuth();
  pdfjs.GlobalWorkerOptions.workerSrc = `/pdfjs/pdf.worker.min.js`;

  useEffect(() => {
    let api_key = localStorage.getItem("api_key");
    setApiKey(api_key);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log("User signed in:", currentUser.uid);
      } else {
        setUser(null);
        console.log("No user signed in");
        toast.error("You need to be signed in to upload your resume.");
        window.location.href = "/sign-in";
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (pdfText && pdfText.trim().length > 0 && jobData) {
      console.log("Sending text for ATS analysis:", pdfText);
      sendResumeForAnalysis(pdfText, jobData);
    } else {
      console.warn("Skipping ATS analysis: No valid resume text or Job Description.");
    }
  }, [jobData, pdfText, actionType]);

  useEffect(() => {
    if (atsData != null) {
      ATS();
    }
  }, [atsData]);

  const handelDataSubmit = async () => {
    if (!inputValue.trim()) {
      setError("This field is required.");
      return;
    }
    setJobData(inputValue);
    console.log("Saved Job Description:", inputValue);
    if (actionType === "build") {
      setBuildLoading(true);
    } else if (actionType === "analyze") {
      setAnalyzeLoading(true);
    }
  };

  const ATS = () => {
    console.log("from ATS");
    localStorage.setItem("JD", jobData);
    const skillsDataString = JSON.stringify(skill);
    localStorage.setItem("skill", skillsDataString);

    if (atsData != null) {
      const atsDataString = JSON.stringify(atsData);
      localStorage.setItem("atsData", atsDataString);
      const encodedAtsData = encodeURIComponent(JSON.stringify(atsData));
      setAnalyzeLoading(false); // CHANGED: Use analyzeLoading instead of loading
      setIsModalOpen(false); // Close modal after submission

      // Redirect based on actionType
      if (actionType === "analyze") {
        window.location.href = `/ats-score/ats-next`;
      } else if (actionType === "build") {
        window.location.href = `atsresume/createresume`;
      }
    }
  };

  const geminiClient = new GoogleGenerativeAI(apiKey);

  const sendResumeForAnalysis = async (resumeText: string, jobDescription: string) => {
    console.log("Preparing to send resume text:", resumeText);

    if (!resumeText || resumeText.trim().length === 0) {
      console.error("Error: Cannot send empty resume text.");
      setAnalyzeLoading(false);
      return;
    }

    try {
      let get_score = async () => {
        try {
          const analysisResult = await analyzeResumeForATS(resumeText);
          const analysisSkills = await analyzeResumeForSkill(resumeText, jobDescription);
          console.log("hii ats");
          console.log(analysisSkills, "skills");
          console.log(analysisResult.atsScore);
          setSkill(analysisSkills);
          setAtsData(analysisResult);
        } catch (error) {
          setAnalyzeLoading(false); // CHANGED: Use analyzeLoading instead of loading
          toast.error(error.message);
        }
      };
      get_score();
    } catch (error) {
      setAnalyzeLoading(false); // CHANGED: Use analyzeLoading instead of loading
      console.error("Error analyzing resume:", error);
    }
  };

  async function analyzeResumeForATS(resumeText: any) {
    console.log("from analyzer", resumeText);

    const prompt = `
        Analyze the following resume text for *Applicant Tracking System (ATS) compatibility*.

        *Objectives:*
        1. *Provide an ATS Score (0-100):* Evaluate overall ATS compatibility.
        2. *Detailed ATS Compatibility Evaluation:* Assess keyword optimization, formatting, readability, and section organization.
        3. *Generate Actionable Suggestions for Improvement:* Provide improvements categorized into *Keywords*, *Formatting*, *Sections*, and *Content Clarity*.

        Respond *ONLY* with valid JSON enclosed in triple backticks (json ... ).
        The JSON should have the following structure:

        \`\`\`json
        {
          "atsScore": 65,
          "detailedEvaluation": {
            "keywordOptimization": { "text": "Fair. Keywords are present but not strategically placed...", "rating": 2 },
            "formatting": { "text": "Poor. The resume's structure is basic and relies heavily on visual separators...", "rating": 1 },
            "readability": { "text": "Fair. The language is generally clear, but the structure is somewhat dense...", "rating": 2 },
            "sectionOrganization": { "text": "Fair. Standard sections are present but the order could be optimized...", "rating": 2 }
          },
          "suggestions": {
            "keywords": [
              "Identify target job descriptions and extract relevant keywords...",
              "Incorporate keywords naturally into job descriptions...",
              "Use a mix of long-tail and short-tail keywords."
            ],
            "formatting": [
              "Use a clean, ATS-friendly template with minimal graphics...",
              "Employ a consistent font and font size throughout...",
              "Use clear section headings and subheadings."
            ]
          }
        }
        \`\`\`

        Resume Text:
        ${resumeText}
    `;

    try {
      const model = geminiClient.getGenerativeModel({ model: "gemini-2.0-flash" });
      const response = await model.generateContent(prompt);
      const textResponse = response.response.candidates[0].content.parts[0].text;

      if (!textResponse) {
        return { message: "Empty response from Gemini API." };
      }

      const regex = /```json\s*([\s\S]*?)\s*```/;
      const match = textResponse.match(regex);

      if (!match) {
        return { message: "No valid JSON output found in Gemini API response." };
      }

      const parsedJSON = JSON.parse(match[1]);
      return parsedJSON;
    } catch (error) {
      setAnalyzeLoading(false); // CHANGED: Use analyzeLoading instead of loading
      console.error("Error processing Gemini API response:", error);
      return { message: "Failed to process Gemini API response.", error: error.message };
    }
  }

  async function analyzeResumeForSkill(resumeText: any, jobData: any) {
    console.log("from analyzer", resumeText);

    const prompt = `
        Analyze the following resume text against the job description.

        *Objectives:*
        1. *Provide a Skills Compatibility Score (0-100).*
        2. *Detailed Skills Compatibility Evaluation:* Assess strengths and weaknesses based on technical skills, soft skills, experience relevance, and adaptability.
        3. *Generate Actionable Suggestions for Improvement:* Provide improvements categorized into *Skills Enhancement*, *Training & Certifications*, *Experience Highlighting*, and *Additional Recommendations*.

        Respond *ONLY* with valid JSON enclosed in triple backticks (json ... ).

        The JSON should have the following structure:
        \\\ json
        {
  "Skills Compatibility Score": 10,
  "Detailed Skills Compatibility Evaluation": {
    "Technical Skills": {text:"The resume lists MSOffice and R Programming. The job description requires JavaScript, React/Angular, and web development skills. There is a significant mismatch.","rating": 2}//rating value must be 1 to 5
    "Soft Skills": {"text":"The resume lists communication, interpersonal, and project management skills. These are generally valuable, but the job description doesn't explicitly emphasize specific soft skills beyond usability.","rating": 1}
    "Experience Relevance": {"text":"The resume describes experience as a Socio-Political Research Analyst, which is not directly relevant to web application development. The focus is on data collection, analysis, and communication in a different domain.","rating": 4}
    "Adaptability": {"text":"The resume demonstrates adaptability through research and analysis in a socio-political context. However, there's no evidence of adapting to or learning new technologies required for web development.","rating": 2}
  },
  "Actionable Suggestions for Improvement": {
    "Skills Enhancement": [
      "Acquire proficiency in JavaScript, HTML, CSS, and related web development technologies.",
      "Learn a modern JavaScript framework such as React or Angular.",
      "Practice building web applications and implementing responsive design."
    ],
    "Training & Certifications": [
      "Enroll in online courses or bootcamps focused on web development.",
      "Consider obtaining certifications in relevant web technologies to demonstrate proficiency."
    ],
    "Experience Highlighting": [
      "If any past projects involved even minor web development aspects (e.g., creating simple data visualizations for reports), highlight those experiences.",
      "Create a portfolio of web development projects to showcase skills.",
      "Consider contributing to open-source web development projects to gain experience and build a portfolio."
    ],
    "Additional Recommendations": [
      "Tailor the resume to emphasize any transferable skills, such as analytical thinking, problem-solving, or communication, in the context of web development challenges.",
      "Network with web developers to learn more about the field and potential job opportunities.",
      "Consider an entry-level role or internship in web development to gain practical experience."
    ]
  }
}
  \\\

        Resume Text:
        ${resumeText}

        Job Description:
        ${jobData}
        `;

    try {
      const model = geminiClient.getGenerativeModel({ model: "gemini-2.0-flash" });
      const response = await model.generateContent(prompt);
      const textResponse = response.response.candidates[0].content.parts[0].text;

      if (!textResponse) {
        return { message: "Empty response from Gemini API." };
      }

      const regex = /```json\s*([\s\S]*?)\s*```/;
      const match = textResponse.match(regex);

      if (!match) {
        return { message: "No valid JSON output found in Gemini API response." };
      }

      const parsedJSON = JSON.parse(match[1]);
      return parsedJSON;
    } catch (error) {
      setAnalyzeLoading(false); // CHANGED: Use analyzeLoading instead of loading
      console.error("Error processing Gemini API response:", error);
      return { message: "Failed to process Gemini API response.", error: error.message };
    }
  }

  const handleGetExistingResume = async () => {
    console.log("Fetching existing resume...");
    if (actionType === "build") {
      setBuildLoading(true);
    } else if (actionType === "analyze") {
      setAnalyzeLoading(true);
    }

    if (!user) {
      console.warn("User not signed in! Cannot fetch resume.");
      toast.error("You need to be signed in to access your resume.");
      setBuildLoading(false);
      setAnalyzeLoading(false);
      return;
    }

    const userId = user.uid;
    console.log("User ID:", userId);

    try {
      const userDocRef = ref(db, `user/${userId}/forms/keyvalues/URD`);
      const snapshot = await get(userDocRef);

      if (snapshot.exists()) {
        let resumeText = snapshot.val();
        console.log("Retrieved Resume Data:", resumeText);

        if (resumeText && resumeText.trim().length > 0) {
          setPdfText(resumeText);
        } else {
          console.warn("Fetched resume is empty.");
        }
      } else {
        console.log("No resume data found in database.");
      }
    } catch (error) {
      console.error("Error fetching resume:", error);
    } finally {
     // CHANGED: Reset appropriate loading state based on actionType
     if (actionType === "build") {
      setBuildLoading(false);
    } else if (actionType === "analyze") {
      setAnalyzeLoading(false);
    }
  }
};

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // CHANGED: Set appropriate loading state based on actionType
    if (actionType === "build") {
      setBuildLoading(true);
    } else if (actionType === "analyze") {
      setAnalyzeLoading(true);
    }

    if (e.target.files && e.target.files.length > 0) {
      console.log("File uploaded!");
      const uploadedFile = e.target.files[0];
      setFile(uploadedFile);

      const reader = new FileReader();
      reader.onload = async (event) => {
        if (!event.target?.result) {
          setBuildLoading(false); // CHANGED: Use buildLoading instead of loading
          setAnalyzeLoading(false); // CHANGED: Use analyzeLoading instead of loading
          return;
        }

        try {
          const typedarray = new Uint8Array(event.target.result as ArrayBuffer);
          const pdfDocument = await pdfjs.getDocument({ data: typedarray }).promise;
          let fullText = "";

          for (let i = 1; i <= pdfDocument.numPages; i++) {
            const page = await pdfDocument.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
              .map((item: any) => ("str" in item ? item.str : ""))
              .join(" ");
            fullText += pageText + "\n";
          }

          setPdfText(fullText);
        } catch (error) {
          // CHANGED: Reset appropriate loading state based on actionType
          if (actionType === "build") {
            setBuildLoading(false);
          } else if (actionType === "analyze") {
            setAnalyzeLoading(false);
          }
        }
      };

      reader.readAsArrayBuffer(uploadedFile);
    } else {
      setBuildLoading(false); // CHANGED: Use buildLoading instead of loading
      setAnalyzeLoading(false); // CHANGED: Use analyzeLoading instead of loading
    }
    console.log(pdfText, "text");
  };

  const openModalForBuild = () => {
    setActionType("build"); // ADDED: Set actionType to "build"
    setIsModalOpen(true);
    setInputValue("");
    setError("");
  };

  const openModalForAnalyze = () => {
    setActionType("analyze"); // ADDED: Set actionType to "analyze"
    setIsModalOpen(true);
    setInputValue("");
    setError("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActionType(null); // ADDED: Reset actionType
    setBuildLoading(false); // ADDED: Reset buildLoading
    setAnalyzeLoading(false); // ADDED: Reset analyzeLoading
  };

  return (
    <div className={`bg-gradient-to-b font-sans from-[#11011E] via-[#35013e] to-[#11011E] bg-[#11011E] text-white pt-16 px-6 md:px-16 lg:px-20 ${isModalOpen ? "pointer-events-none" : "pointer-events-auto"}`}>
      <div className="bg-[#FFFFFF05] rounded-xl px-10 py-16 border-[1.5px] border-[#ffffff17] max-w-7xl mx-auto flex flex-col lg:flex-row justify-between animate-fadeIn">
        {/* Left Content */}
        <div className="lg:w-1/2 space-y-6 animate-slideInLeft">
          <div className="flex items-center space-x-2">
            <span className="bg-[#FFFFFF05] border-[1px] border-[#ffffff17] px-3 py-1 rounded-full flex items-center">
              {Array(5)
                .fill()
                .map((_, index) => (
                  <img
                    key={index}
                    src="images/star.png"
                    alt="Star"
                    className="w-3 h-3 mr-1"
                  />
                ))}
              <span>4.5 star rated</span>
            </span>
          </div>
          <h1 className="text-4xl font-bold leading-tight">Not getting hired? <br /> It's your resume</h1>
          <p className="text-gray-300 text-lg">
            Create a professional resume with ease. Our builder features 30+ templates, step-by-step guidance, and endless customizable content options.
          </p>
          <div className="flex gap-x-4">
            <button className="bg-[#0FAE96] hover:bg-[#288d7d] text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              onClick={openModalForBuild}
              disabled={buildLoading || analyzeLoading} // Disable only if either is loading
            >

              {buildLoading  ? "Building..." : "Build your Resume"}
              
            </button>
            <button
              className="bg-[#0FAE96] hover:bg-[#288d7d] text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              onClick={openModalForAnalyze}
              disabled={buildLoading || analyzeLoading} // Disable only if either is loading
            >
              {analyzeLoading  ? "Analyzing..." : "Analyze Your Resume"}
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex -space-x-4 mb-2">
              {["Img1.png", "Img2.png", "Img3.png", "Img4.png"].map((img, index) => (
                <img
                  key={index}
                  src={`Images/${img}`}
                  alt={`Avatar ${index + 1}`}
                  className="w-10 h-10 rounded-full border border-gray-700 transition-all duration-300 hover:scale-110"
                />
              ))}
            </div>
            <span className="text-sm text-gray-300">and 150+ jobseekers using JobForm Automator</span>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="mt-12 lg:mt-0 animate-slideInRight">
          <div>
            <img
              src="/images/resume.png"
              alt="Resume 1"
              className="w-96 transition-all duration-300 transform hover:scale-105"
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        // CHANGED: Pass appropriate loading state based on actionType
        loading={actionType === "build" ? buildLoading : analyzeLoading}
        inputValue={inputValue}
        setInputValue={setInputValue}
        error={error}
        file={file}
        handleFileChange={handleFileChange}
        handelDataSubmit={handelDataSubmit}
        handleGetExistingResume={handleGetExistingResume}
      />
    </div>
  );
}