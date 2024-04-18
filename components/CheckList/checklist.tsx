import React from 'react';
import Link from 'next/link';

export const ChecklistPage = () => {
  const checklistItems = [
    {
      id: 1,
      title: 'User Authentication',
      description: 'Implement user authentication functionality',
      completed: true,
      link: "/signin"
    },
    {
      id: 4,
      title: 'Story Component',
      description: 'Create a component to display stories',
      completed: true,
      link: "/stories"
    },
    {
      id: 5,
      title: 'Upload Story Feature',
      description: 'Implement a feature to allow users to upload stories',
      completed: true,
      link: "/uploadStory"
    },
    {
      id: 9,
      title: 'Editing and Deleting Story Features',
      description: 'Authenticated user can edit and delete their stories',
      completed: true,
      link: "/stories/indeStories"
    },
    {
      id: 6,
      title: 'Profile Page',
      description: 'Design and implement user profile page',
      completed: true,
      link: '/profile'
    },
    {
      id: 7,
      title: 'Sign In/Sign Up Pages',
      description: 'Create pages for user authentication',
      completed: true,
      link: "/signup"
    },
    {
      id: 10,
      title: 'JWT Token Authentication System',
      description: 'User will be authenticated by JWT token authentication,',
      completed: true,
      link: "/signin"
    },
    {
      id: 11,
      title: 'Refresh Acess Token and get new access token automatically',
      description: 'After expiring a access token a new access token will be created by the refresh token and the new access token will be automatically added to all the protected routes',
      completed: true,
      link: "/signin"
    },
    {
      id: 8,
      title: 'Navigation Bar',
      description: 'Design and implement a navigation bar for easy site navigation',
      completed: true,
      link: "/"
    },
    {
      id: 3,
      title: 'Modern UI Components',
      description: 'Use modern UI components for a sleek look',
      completed: true,
      link: "/"
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Website Checklist</h1>
        <div className="grid gap-6">
          {checklistItems.map((item) => (
            <Link href={item.link} key={item.id}>
              <div
                className={`p-6 rounded-lg transition-colors duration-300 ${
                  item.completed
                    ? 'bg-green-100 hover:bg-green-200'
                    : 'bg-red-100 hover:bg-red-200'
                }`}
              >
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h2>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <span
                  className={`font-semibold ${
                    item.completed ? 'text-green-700' : 'text-red-700'
                  }`}
                >
                  {item.completed ? 'Completed' : 'Incomplete'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

