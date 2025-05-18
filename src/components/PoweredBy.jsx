// src/components/PoweredBy.jsx
import React from 'react';

const Icon = ({ src, alt }) => (
  <img src={src} alt={alt} className="w-5 h-5 inline-block mr-2 align-text-bottom" />
);

const Card = ({ title, icon, children }) => (
  <div className="bg-[#1C1F26] rounded-xl p-6 shadow-md border border-[#2D2F36]">
    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
      <span>{icon}</span> {title}
    </h3>
    <div className="text-[#CBD5E1] text-sm space-y-2">{children}</div>
  </div>
);

const PoweredBy = () => {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Powered By</h1>
        <p className="text-[#94A3B8] text-lg mt-2">
          Explore the full serverless stack and modern frontend architecture behind this app.
        </p>
      </div>

      <Card title="Frontend" icon="🔮">
        <p>
          <Icon src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
          <strong>React (with Tailwind CSS):</strong> Used for a fast, responsive, and modular user interface. Forms, tables, and future graphs are built using clean utility-first design.
        </p>
        <p>
          <Icon src="https://docs.amplify.aws/assets/logo.svg" alt="Amplify" />
          <strong>AWS Amplify Authenticator:</strong> Manages secure user login/signup via AWS Cognito with minimal setup.
        </p>
      </Card>

      <Card title="Backend" icon="🧠">
        <p>
          <Icon src="https://raw.githubusercontent.com/aws/aws-icons/main/PNG%20Individual%20Icons/Compute/AWS-Lambda_light-bg.png" alt="Lambda" />
          <strong>AWS Lambda:</strong> Stateless functions that handle calculation logic and secure data operations — designed to be fast, efficient, and scalable.
        </p>
        <p>
          <Icon src="https://raw.githubusercontent.com/aws/aws-icons/main/PNG%20Individual%20Icons/Database/Amazon-DynamoDB_light-bg.png" alt="DynamoDB" />
          <strong>Amazon DynamoDB:</strong> A NoSQL database storing user-specific rental scenarios with flexible schema and lightning performance.
        </p>
        <p>
          <Icon src="https://raw.githubusercontent.com/aws/aws-icons/main/PNG%20Individual%20Icons/Application-Integration/Amazon-API-Gateway_light-bg.png" alt="API Gateway" />
          <strong>API Gateway:</strong> Securely routes frontend requests to backend functions, verifying user identity via JWT tokens.
        </p>
        <p>
          <Icon src="https://raw.githubusercontent.com/aws/aws-icons/main/PNG%20Individual%20Icons/Security-Identity-Compliance/Amazon-Cognito_light-bg.png" alt="Cognito" />
          <strong>AWS Cognito:</strong> Powers authentication and authorization, with user data scoped using identity tokens.
        </p>
      </Card>

      <Card title="Hosting & Security" icon="🌐">
        <p>
          <strong>CORS (Cross-Origin Resource Sharing):</strong> Set up on API Gateway to ensure frontend/backend communication is both secure and accessible.
        </p>
        <p>
          <strong>IAM Roles & Policies:</strong> Granular permissions restrict Lambda access to only what’s necessary — securing user data and minimizing risk.
        </p>
      </Card>

      <div className="bg-[#0B0C10] text-[#94A3B8] italic border-l-4 border-blue-600 pl-4 py-4">
        This app is fully serverless. There are no traditional servers to manage. Everything is on-demand, scalable, and personalized per user — all powered by AWS.
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-[#CBD5E1]">
        <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="w-5 h-5" /> GitHub
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" className="w-5 h-5" /> LinkedIn
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
          <img src="https://www.svgrepo.com/show/349426/youtube.svg" alt="YouTube" className="w-5 h-5" /> YouTube
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
          <img src="https://www.svgrepo.com/show/364604/tiktok.svg" alt="TikTok" className="w-5 h-5" /> TikTok
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
          <img src="https://www.svgrepo.com/show/300940/website.svg" alt="Portfolio" className="w-5 h-5" /> Portfolio
        </a>
      </div>
    </div>
  );
};

export default PoweredBy;



