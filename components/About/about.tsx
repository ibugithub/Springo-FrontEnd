import React from 'react';
import Image from 'next/image';
import TypeScriptImage from '../../public/images/typescript.png';
import TailwindImage from '../../public/images/tailwindcss.png';
import NextJsImage from '../../public/images/nextjs.png';
import AxiosImage from '../../public/images/axios.png';
import DjangoImage from '../../public/images/django.png';
import DRFImage from '../../public/images/drf.png';
import JWTImage from '../../public/images/jwt.png';
import PostgreSQLImage from '../../public/images/PostgresSQL.png'
import VercelImage from '../../public/images/verc.png'
import RenderImage from '../../public/images/render.png';
import SubbaseImage from '../../public/images/supbase.png';
import ReduxImage from '../../public/images/redux.png'

export const About = () => {
  return (
    <div className=" pt-[1rem] pb-[1rem] bg-gradient-to-br from-purple-400 to-blue-500 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">About Me</h2>
        <p className="text-lg text-gray-700 mb-8">My name is Umme Jahan, and I&apos;m a full-stack web developer.</p>

        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Project Description</h2>
        <p className="text-lg text-gray-700 mb-8">I chose this project because I wanted to create a platform for sharing and discovering stories from around the world. I&apos;m passionate about storytelling and wanted to provide a space for both readers and writers to connect.</p>

        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Technology Used</h2>
        <div className="mb-8 grid grid-cols-2 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <p className="text-xl font-semibold">Frontend</p>
            </div>
            <div className="flex items-center">
              <Image src={TypeScriptImage} alt="TypeScript" width={48} height={48} className="mr-4" />
              <p>TypeScript</p>
            </div>
            <div className="flex items-center">
              <Image src={TailwindImage} alt="Tailwind CSS" width={48} height={48} className="mr-4" />
              <p>Tailwind CSS</p>
            </div>
            <div className="flex items-center">
              <Image src={NextJsImage} alt="Next.js" width={48} height={48} className="mr-4" />
              <p>Next.js</p>
            </div>
            <div className="flex items-center">
              <Image src={AxiosImage} alt="Axios" width={48} height={48} className="mr-4" />
              <p>Axios</p>
            </div>
            <div className="flex items-center">
              <Image src={ReduxImage} alt="Redux" width={48} height={48} className="mr-4" />
              <p>Redux</p>
            </div>
          </div>
          <div>
            <div className="flex items-center mb-4">
              <p className="text-xl font-semibold">Backend</p>
            </div>
            <div className="flex items-center">
              <Image src={DjangoImage} alt="Django" width={48} height={48} className="mr-4" />
              <p>Django</p>
            </div>
            <div className="flex items-center">
              <Image src={DRFImage} alt="Django Rest Framework" width={48} height={48} className="mr-4" />
              <p>Django Rest Framework</p>
            </div>
            <div className="flex items-center">
              <Image src={JWTImage} alt="JWT" width={48} height={48} className="mr-4" />
              <p>JWT</p>
            </div>
            <div className="flex items-center">
              <Image src={PostgreSQLImage} alt="PostgreSQL" width={48} height={48} className="mr-4" />
              <p>PostgreSQL</p>
            </div>
          </div>
          <div>
            <div className="flex items-center mb-4">
              <p className="text-xl font-semibold">Deployment</p>
            </div>
            <div className="flex items-center">
              <Image src={VercelImage} alt="Vercel" width={48} height={48} className="mr-4" />
              <p>Vercel</p>
            </div>
            <div className="flex items-center">
              <Image src={RenderImage} alt="Render" width={48} height={48} className="mr-4" />
              <p>Render</p>
            </div>
            <div className="flex items-center">
              <Image src={SubbaseImage} alt="Subbase" width={48} height={48} className="mr-4" />
              <p>Subbase</p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-semibold text-gray-800 mb-6">What I Learned</h2>
        <ul className="pl-6 mb-8">
          <li className="mb-2">
            <span className="text-green-400">&#8594;</span> Gained valuable experience and knowledge in deployment processes and server configurations.
          </li>
          <li className="mb-2">
            <span className="text-green-400">&#8594;</span> Enhanced troubleshooting skills by encountering and resolving issues specific to Next.js.
          </li>
          <li className="mb-2">
            <span className="text-green-400">&#8594;</span> Improved ability to handle various errors effectively, enhancing troubleshooting and debugging skills.
          </li>
          <li className="mb-2">
            <span className="text-green-400">&#8594;</span> Successfully deployed both frontend and backend components on AWS, ensuring seamless communication and overcoming initial challenges.
          </li>
        </ul>

      </div>
    </div>
  );
};

