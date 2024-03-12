import React from "react";
import "./Header.css";
import { Button } from "react-bootstrap";
import { Input } from "@mui/material";
import { useEffect,useState } from "react";

const Header = (props) => {
  const { handleNavigateQuestionList } = props;
  const [sentences] = useState(['Empowering beginners', 'Refining logical skills']);
  const [display, setDisplay] = useState('');
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const typingSpeed = 150;

  useEffect(() => {
    if (index === sentences.length) {
      setTimeout(() => {
        setDisplay('');
        setIndex(0);
      }, 100); // wait for 2 seconds before starting from the first sentence again
      return;
    }

    if (subIndex === sentences[index].length) {
      setTimeout(() => {
        setIndex((prev) => prev + 1);
        setDisplay('');
        setSubIndex(0);
      }, 1000); // wait for 2 seconds before starting next sentence
      return;
    }

    if (subIndex < sentences[index].length) {
      setTimeout(() => {
        setDisplay((prev) => prev + sentences[index][subIndex]);
        setSubIndex((prev) => prev + 1);
      }, typingSpeed);
    }
  }, [display,subIndex,index]);

  useEffect(() => {
    setTimeout(()=>{
      setBlink(!blink);
    },500);
  },[blink]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full pt-28">
          <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:gap-10 md:px-6">
            <div className="space-y-3">
              <div className="flex justify-center">
                <h1 className="text-4xl font-bold tracking-tighter 
                sm:text-5xl md:text-6xl mr-0">{display}</h1>
                <span className="text-4xl sm:text-5xl md:text-6xl pt-3" style={{display:(blink ? 'block' : 'none')}}>|</span>
              </div>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Elevate your coding journey with structured learning paths and
                hands-on challenges.
              </p>
            </div>
            <div className="w-full max-w-[700px] space-y-2 flex flex-col justify-center pt-10">
              <Input
                placeholder="Enter your email to get started"
                type="email"
              />
              <div>
                <Button
                  className="mt-10 w-40 text-center"
                  style={{ border: "none" }}
                  onClick={() => {
                    handleNavigateQuestionList(true, true, true);
                  }}
                >
                  Explore
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Header;
