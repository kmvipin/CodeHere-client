import React from "react";
import "./Header.css";
import { Button } from "react-bootstrap";
import { Input } from "@mui/material";
import { useEffect,useState } from "react";
import TypewriterComponent from "typewriter-effect";

const Header = (props) => {
  const { handleNavigateQuestionList } = props;
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    setTimeout(()=>{
      setBlink(!blink);
    },500);
  },[blink]);

  return (
    <div className="flex flex-col md:min-h-[calc(100vh-55px)] min-h-[80vh] ">
      <main className="flex-1">
        <section className="w-full pt-20">
          <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:gap-10 md:px-6">
            <div className="space-y-3">
              <div className="flex justify-center">
                <h1 className="text-4xl font-bold tracking-tighter 
                sm:text-5xl md:text-6xl mr-0">
                  <TypewriterComponent
                    options={{
                      strings: ['Empowering beginners', 'Refining logical skills'],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </h1>
              </div>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Elevate your coding journey with structured learning paths and
                hands-on challenges.
              </p>
            </div>
            <div className="w-full max-w-[700px] space-y-2 flex flex-col justify-center pt-10">
              <Input
                placeholder="Let's Build Your Programming Fundamentals"
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
