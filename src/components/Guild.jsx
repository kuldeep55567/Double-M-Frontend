import React from 'react'
import {FaCheckCircle} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import Button from './Button';
const Guild = () => {
    const rules = [
      "Be respectful to all guild members.",
      "Participate actively in guild activities.",
      "Minimum Weekly Glory should be more than 400.",
      "Join WhatsApp Group as they are very Important",
      "Obey the leadership and follow Admin's words.",
      "BR kd should be more than 5+.",
      "CS kd should be more than 2+ and Dmg 2000+",
      "Maintain fair play and avoid cheating.",
      "Support this Guild and Leader truely.",
      "Participate in Guild Tournaments and stay Active on Notice"
    ];
    return (
      <div className="flex flex-col justify-center items-center">
        <h1 className=" text-gradient text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-center font-bold mb-8">
          Guild Rules
        </h1>
        <div className="w-full">
          <ul className="mx-auto w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
            {rules.map((rule, index) => (
              <li key={index} className="flex items-start justify-start mb-4 text-white">
                <FaCheckCircle className="mr-2 mt-1 text-green-500" size={20}/>
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
                  {`Rule ${index + 1}: ${rule}`}
                </h2>
              </li>
            ))}
          </ul>
        </div>
        <Link to="/apply"><Button styles={`mt-10`} label='Apply for Guild' /></Link>
      </div>
    );
  };

export default Guild
