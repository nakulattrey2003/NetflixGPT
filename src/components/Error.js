import React, { useEffect } from "react";

const ErrorPage = () => {
  useEffect(() => {
    const handleMouseMove = (event) => {
      const pageX = document.documentElement.clientWidth;
      const pageY = document.documentElement.clientHeight;
      const mouseY = event.pageY;
      const mouseX = event.pageX;
      const yAxis = ((pageY / 2 - mouseY) / pageY) * 300;
      const xAxis = -((pageX / 2 - mouseX) / pageX) * 100;

      document.querySelector(
        ".box__ghost-eyes"
      ).style.transform = `translate(${xAxis}%, ${yAxis}%)`;
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#28254C] font-sans text-white">
      <div className="box relative w-[350px] max-h-[600px] min-h-[450px] bg-[#332F63] rounded-[20px] p-[30px_50px]">
        <div className="box__ghost absolute left-1/2 top-[30%] transform -translate-x-1/2 -translate-y-[30%] p-[15px_25px_25px]">
          <div className="symbol relative opacity-20 animate-shine">
            <div className="before:content-[''] before:absolute before:w-[12px] before:h-[4px] before:bg-white before:rounded-[5px] before:bottom-[65px] before:left-0 before:transform before:rotate-45 after:content-[''] after:absolute after:w-[12px] after:h-[4px] after:bg-white after:rounded-[5px] after:bottom-[65px] after:left-0 after:transform after:-rotate-45"></div>
          </div>
          <div className="symbol absolute left-[-5px] top-[30px] h-[18px] w-[18px] border-[4px] border-white rounded-full opacity-20 animate-shine-2"></div>
          <div className="symbol relative opacity-20 animate-shine-3">
            <div className="before:content-[''] before:absolute before:w-[12px] before:h-[4px] before:bg-white before:rounded-[5px] before:top-[5px] before:left-[40px] before:transform before:rotate-[90deg] after:content-[''] after:absolute after:w-[12px] after:h-[4px] after:bg-white after:rounded-[5px] after:top-[5px] after:left-[40px] after:transform after:rotate-[180deg]"></div>
          </div>
          <div className="symbol relative opacity-20 animate-shine-4">
            <div className="before:content-[''] before:absolute before:w-[15px] before:h-[4px] before:bg-white before:rounded-[5px] before:top-[10px] before:right-[30px] before:transform before:rotate-[45deg] after:content-[''] after:absolute after:w-[15px] after:h-[4px] after:bg-white after:rounded-[5px] after:top-[10px] after:right-[30px] after:transform after:-rotate-[45deg]"></div>
          </div>
          <div className="symbol absolute right-[5px] top-[40px] h-[12px] w-[12px] border-[3px] border-white rounded-full opacity-20 animate-shine-5"></div>
          <div className="symbol relative opacity-20 animate-shine-6">
            <div className="before:content-[''] before:absolute before:w-[15px] before:h-[4px] before:bg-white before:rounded-[5px] before:bottom-[65px] before:right-[-5px] before:transform before:rotate-[90deg] after:content-[''] after:absolute after:w-[15px] after:h-[4px] after:bg-white after:rounded-[5px] after:bottom-[65px] after:right-[-5px] after:transform after:rotate-[180deg]"></div>
          </div>

          <div className="box__ghost-container relative w-[100px] h-[100px] bg-white rounded-[100px_100px_0_0] m-[0_auto] animate-upndown">
            <div className="box__ghost-eyes absolute left-1/2 top-[45%] h-[12px] w-[70px] transform -translate-x-1/2 -translate-y-[50%] flex justify-between">
              <div className="box__eye-left w-[12px] h-[12px] bg-[#332F63] rounded-full"></div>
              <div className="box__eye-right w-[12px] h-[12px] bg-[#332F63] rounded-full"></div>
            </div>
            <div className="box__ghost-bottom absolute top-[100%] left-0 right-0 flex justify-between">
              <div className="relative top-[-10px] h-[20px] w-full bg-white rounded-full"></div>
              <div className="relative top-[-12px] h-[20px] w-full border-t-[15px] border-[#332F63] bg-transparent rounded-full"></div>
              <div className="relative top-[-10px] h-[20px] w-full bg-white rounded-full"></div>
              <div className="relative top-[-12px] h-[20px] w-full border-t-[15px] border-[#332F63] bg-transparent rounded-full"></div>
              <div className="relative top-[-10px] h-[20px] w-full bg-white rounded-full"></div>
            </div>
          </div>
          <div className="box__ghost-shadow h-[20px] m-[0_auto] rounded-full shadow-[0_50px_15px_5px_#3B3769] animate-smallnbig"></div>
        </div>

        <div className="box__description absolute bottom-[30px] left-1/2 transform -translate-x-1/2 text-center">
          <div className="box__description-container text-white text-center w-[200px] text-[16px] m-[0_auto]">
            <div className="box__description-title text-[24px] tracking-[0.5px]">
              Whoops!
            </div>
            <div className="box__description-text text-[#8C8AA7] leading-[20px] mt-[20px]">
              It seems like we couldn't find the page you were looking for
            </div>
          </div>
          <a
            href="/login"
            rel="noopener noreferrer"
            className="box__button relative block bg-[#FF5E65] border border-transparent rounded-full h-[50px] text-center text-white leading-[50px] text-[18px] px-[70px] whitespace-nowrap mt-[25px] transition-[background_0.5s_ease] overflow-hidden hover:bg-transparent hover:border-white"
          >
            Go back
            <span className="absolute w-[20px] h-[100px] bg-white bottom-[-25px] left-0 border-2 border-white transform translate-x-[-50px] rotate-45 transition-transform hover:translate-x-[250px]"></span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
