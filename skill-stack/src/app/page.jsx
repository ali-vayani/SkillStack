"use client"
import ChapterDropDown from "./components/ChapterDropDown";
import BackgroundCode from "./components/BackgroundCode";
import Button from "./components/Button";
import FirebaseLogin from "./components/FirebaseLogin";
import { useState, useEffect } from "react";

export default function Home() {
  const [display, setDisplay] = useState(false);
  
  useEffect(() => {
    console.log("testt")
  },[display])

  return (
    <div className="flex justify-center items-center flex-col relative">
      <div className="absolute top-7 left-7 -z-10 text-primary/25">
        <BackgroundCode/>
      </div>
      
      <div className="absolute top-7 right-7 flex gap-3">
        <Button name="Register" fill={false} />
        <Button name="Login" fill={true} onClick={() => setDisplay(!display)}/>
      </div>

      {/* Add fixed positioning and z-index to ensure the login shows above everything */}
      {display && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-lg">
            <button 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl z-30"
              onClick={() => setDisplay(false)}
            >
              ×
            </button>
            <FirebaseLogin />
          </div>
        </div>
      )}
      
      <section className="h-screen flex justify-center items-center flex-col">
        <h1 className="text-7xl text-primary font-bold mb-2">Skill Stack</h1>
        <h4 className="text-3xl text-secondary font-light">Build Your Skills, One Stack at a Time!</h4>
      </section>
      
      <section className="min-h-screen">
        <ChapterDropDown chapterName="Chapter 1: Introduction to Java Programming"/>
        <ChapterDropDown chapterName="Chapter 2: Primitive Data and Definite Loops"/>
        <ChapterDropDown chapterName="Chapter 3: Parameters and Objects"/>
      </section>
    </div>
  );
}