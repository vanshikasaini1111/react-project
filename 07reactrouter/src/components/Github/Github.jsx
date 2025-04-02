import React from 'react';
import { useLoaderData } from 'react-router-dom';

function Github() {
    const data = useLoaderData();

    return (
        <div className="text-center m-4 bg-gray-800 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-4">GitHub Followers: {data.followers}</h2>
            <img 
                src={data.avatar_url} 
                alt="GitHub Avatar" 
                width={200} 
                className="rounded-full mx-auto border-4 border-white"
            />
            <p className="mt-4 text-lg">
                <a 
                    href={data.html_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-400 hover:underline"
                >
                    Visit GitHub Profile
                </a>
            </p>
        </div>
    );
}

export default Github;

export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/Hiteshgarg2004');
    return response.json();
};