import React from 'react';

export const Audience = () => {
  return (
    <div className="pt-[1rem] pb-[1rem] bg-gradient-to-br from-blue-400 to-purple-500 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-lg w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Welcome to Springo 📚</h2>
        <hr className="border-t-2 border-gray-300 mb-4" />
        <p className="text-lg text-gray-700 mb-6">Springo is a platform designed for avid readers, aspiring writers, and storytellers from all around the world 🌍.</p>
        <hr className="border-t-2 border-gray-300 mb-4" />
        <p className="text-lg text-gray-700 mb-6">Our users are individuals who love to immerse themselves in captivating stories, whether they are readers looking for new adventures or writers eager to share their creativity with the world ✍️.</p>
        <hr className="border-t-2 border-gray-300 mb-4" />
        <p className="text-lg text-gray-700 mb-6">Through Springo, users can discover a diverse range of stories, connect with other enthusiasts, and unleash their own storytelling potential 🚀.</p>
        <hr className="border-t-2 border-gray-300 mb-4" />
        <p className="text-lg text-gray-700 mb-6">We aim to solve the problem of finding engaging and quality content while also providing a platform for writers to showcase their work and connect with a global audience 🌐.</p>
        <hr className="border-t-2 border-gray-300 mb-4" />
        <p className="text-lg text-gray-700 mb-6">Once you have experienced the world of Springo, we encourage you to take action by exploring our collection of stories, sharing your own stories, and engaging with our vibrant community 🌟.</p>
        <div className='flex justify-center'>
          <a href="/stories" className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">Get Started</a>
        </div>
      </div>
    </div>
  );
};
