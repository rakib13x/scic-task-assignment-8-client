import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="p-6">
      <div className="mx-auto">
        <div
          className="relative rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4"
          style={{
            backgroundImage:
              "linear-gradient(to left bottom, #f87171, #f55979, #ee4085, #e12896, #cb18a9, #bd12b5, #aa16c1, #921fce, #881ed5, #7d1fdc, #6e21e3, #5c24eb)",
          }}
        >
          <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-8 lg:py-16 lg:pr-0">
            <div className="lg:self-center">
              <h2 className="text-3xl leading-9 font-extrabold text-white sm:text-4xl sm:leading-10">
                <span className="block">
                  Simplify your day with our intuitive task management system.
                </span>
              </h2>
              <p className="mt-4 text-base leading-6 text-white">
                Discover the power of efficient task management with Tasker. Our
                platform is designed to help you streamline your day, set
                priorities, and achieve your goals with ease
              </p>
              <p className="mt-4 text-base leading-6 text-dark-blue-800"></p>
              <Link
                to="/dashboard/task"
                style={{ backgroundColor: "blueviolet" }}
                className="mt-8 border border-transparent rounded-md shadow px-6 py-3 inline-flex items-center text-base leading-6 font-medium text-white transition duration-150 ease-in-out"
              >
                Explore
              </Link>
              <a
                href="#"
                target="_blank"
                className="ml-4 mt-8 text-white font-bold text-sm underline"
              >
                Learn more
              </a>
            </div>
          </div>
          <div className="relative pb-3/5 -mt-6 md:pb-1/2">
            <img
              className="absolute inset-0 w-full h-full transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-10 lg:translate-y-20 object-center"
              src="https://i.ibb.co/Yhzm4Dm/time-management.jpg"
              alt="Hero"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
