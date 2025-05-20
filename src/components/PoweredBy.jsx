// src/components/PoweredBy.jsx
import React from 'react';
import { LayoutDashboard, BrainCircuit, ShieldCheck, Blocks, BarChart3, Settings, Server, Globe } from 'lucide-react';

const Icon = ({ src, alt }) => (
  <img src={src} alt={alt} className="w-5 h-5 inline-block mr-2 align-text-bottom" />
);

const Card = ({ title, icon, children }) => (
  <div className="bg-[#1C1F26] rounded-xl p-6 shadow-lg hover:shadow-xl transition border border-[#2D2F36]">
    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
      {icon} <span>{title}</span>
    </h3>
    <div className="text-[#CBD5E1] text-sm space-y-2">{children}</div>
  </div>
);

const PoweredBy = () => {
  return (
    <div className="space-y-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Powered By</h1>
        <p className="text-[#94A3B8] text-lg mt-2">
          Explore the full serverless stack and modern frontend architecture behind this app.
        </p>
      </div>

      <Card title="Frontend" icon={<LayoutDashboard className="w-5 h-5 text-blue-500" />}>
        <p>
          <Icon src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
          <strong>React + Tailwind CSS:</strong> Component-driven UI styled with utility-first Tailwind for responsive layout and theming.
        </p>
        <p>
          <Icon src="https://docs.amplify.aws/assets/logo.svg" alt="Amplify" />
          <strong>AWS Amplify Authenticator:</strong> Handles secure user login via Cognito with clean, customizable UI components.
        </p>
        <p>
          <Settings className="inline-block w-4 h-4 text-blue-400 mr-2" />
          <strong>shadcn/ui:</strong> Styled component primitives built with Tailwind and Radix for elegant interface interactions.
        </p>
        <p>
          <Blocks className="inline-block w-4 h-4 text-blue-400 mr-2" />
          <strong>React Context API:</strong> Global state shared across views for seamless user flow without prop drilling.
        </p>
        <p>
          <BarChart3 className="inline-block w-4 h-4 text-blue-400 mr-2" />
          <strong>Recharts (planned):</strong> Upcoming dashboards will use this for rich visual insights into cashflow and ROI.
        </p>
      </Card>

      <Card title="Backend" icon={<BrainCircuit className="w-5 h-5 text-blue-500" />}>
        <p>
          <Icon src="https://raw.githubusercontent.com/aws/aws-icons/main/PNG%20Individual%20Icons/Compute/AWS-Lambda_light-bg.png" alt="Lambda" />
          <strong>AWS Lambda:</strong> Stateless functions compute, store, and update user data on-demand for high scalability.
        </p>
        <p>
          <Icon src="https://raw.githubusercontent.com/aws/aws-icons/main/PNG%20Individual%20Icons/Database/Amazon-DynamoDB_light-bg.png" alt="DynamoDB" />
          <strong>Amazon DynamoDB:</strong> Fast NoSQL database storing user-specific investment scenarios with partition keys.
        </p>
        <p>
          <Icon src="https://raw.githubusercontent.com/aws/aws-icons/main/PNG%20Individual%20Icons/Application-Integration/Amazon-API-Gateway_light-bg.png" alt="API Gateway" />
          <strong>API Gateway:</strong> Validates tokens and routes frontend requests to Lambda endpoints securely.
        </p>
        <p>
          <Icon src="https://raw.githubusercontent.com/aws/aws-icons/main/PNG%20Individual%20Icons/Security-Identity-Compliance/Amazon-Cognito_light-bg.png" alt="Cognito" />
          <strong>AWS Cognito:</strong> Manages user authentication and authorization with JWT-based access controls.
        </p>
        <p>
          <Icon src="https://raw.githubusercontent.com/aws/aws-icons/main/PNG%20Individual%20Icons/Security-Identity-Compliance/AWS-Identity-Access-Management-IAM_light-bg.png" alt="IAM" />
          <strong>AWS IAM:</strong> Controls exact Lambda permissions with least-privilege roles tied to secure backend access.
        </p>
      </Card>

      <Card title="Hosting & Delivery" icon={<ShieldCheck className="w-5 h-5 text-blue-500" />}>
        <p>
          <Icon src="https://raw.githubusercontent.com/aws/aws-icons/main/PNG%20Individual%20Icons/Storage/Amazon-S3_light-bg.png" alt="S3" />
          <strong>Amazon S3:</strong> Static web hosting for the production build of the React app.
        </p>
        <p>
          <Icon src="https://raw.githubusercontent.com/aws/aws-icons/main/PNG%20Individual%20Icons/Networking-Content-Delivery/Amazon-CloudFront_light-bg.png" alt="CloudFront" />
          <strong>AWS CloudFront:</strong> Global CDN distributing the app securely with fast caching and low-latency delivery.
        </p>
        <p>
          <strong>CORS:</strong> Configured to safely allow frontend-backend communication across AWS services.
        </p>
        <p>
          <strong>IAM Security:</strong> Enforced at every layer, ensuring only appropriate service-level access between components.
        </p>
      </Card>

      <div className="bg-[#0B0C10] text-[#94A3B8] italic border-l-4 border-blue-600 pl-4 py-4">
        This app is <strong>100% serverless</strong>. Built on-demand, auto-scaling, and globally distributed using AWS services only.
      </div>

      <div className="text-center text-[#94A3B8] border-t pt-6 mt-6">
        <p className="text-sm mb-3">Connect with me:</p>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-[#CBD5E1]">
          <a href="http://github.com/renaissancejlc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" className="w-5 h-5" /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/renaissancejlc/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" className="w-5 h-5" /> LinkedIn
          </a>
          <a href="https://www.youtube.com/@Ren-q1w" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
            <img src="https://www.svgrepo.com/show/349426/youtube.svg" alt="YouTube" className="w-5 h-5" /> YouTube
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
            <img src="https://www.svgrepo.com/show/364604/tiktok.svg" alt="TikTok" className="w-5 h-5" /> TikTok
          </a>
          <a href="https://renaissancecarr.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
            <img src="https://www.svgrepo.com/show/300940/website.svg" alt="Portfolio" className="w-5 h-5" /> Portfolio
          </a>
        </div>
      </div>
    </div>
  );
};

export default PoweredBy;