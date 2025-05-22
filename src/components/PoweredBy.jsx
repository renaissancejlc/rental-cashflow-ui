// src/components/PoweredBy.jsx
import React from 'react';
import {
  LayoutDashboard,
  BrainCircuit,
  ShieldCheck,
  Blocks,
  BarChart3,
  Settings,
  Youtube,
  Music,
  TerminalSquare,
  BookText,
  Github,
  Linkedin
} from 'lucide-react';

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
          <strong>React (with Tailwind CSS):</strong> A modular, component-driven UI built with Tailwind utility classes for rapid, responsive design.
        </p>
        <p>
          <Icon src="/icons/aws/Asset-Package_02072025.dee42cd0a6eaacc3da1ad9519579357fb546f803 (1)/Architecture-Service-Icons_02072025/Arch_Front-End-Web-Mobile/16/Arch_AWS-Amplify_16.svg" alt="Amplify" />
          <strong>AWS Amplify Authenticator:</strong> Handles sign-up and login securely using AWS Cognito, abstracted through Amplify's component library.
        </p>
        <p>
          <Blocks className="inline-block w-4 h-4 text-blue-400 mr-2" />
          <strong>React Context:</strong> Enables shared state across tabs and components without prop drilling.
        </p>
        <p>
          <BarChart3 className="inline-block w-4 h-4 text-blue-400 mr-2" />
          <strong>Recharts:</strong> Future analytics dashboards will use React-powered graphs for rental performance visualization.
        </p>
      </Card>

      <Card title="Backend" icon={<BrainCircuit className="w-5 h-5 text-blue-500" />}>
        <p>
          <Icon src="/icons/aws/Asset-Package_02072025.dee42cd0a6eaacc3da1ad9519579357fb546f803 (1)/Architecture-Service-Icons_02072025/Arch_Compute/16/Arch_AWS-Lambda_16.svg" alt="AWS Lambda" />
          <strong>AWS Lambda:</strong> Stateless serverless functions power calculations, saves, fetches, and updates for each scenario.
        </p>
        <p>
          <Icon src="/icons/aws/Asset-Package_02072025.dee42cd0a6eaacc3da1ad9519579357fb546f803 (1)/Architecture-Service-Icons_02072025/Arch_Database/16/Arch_Amazon-DynamoDB_16.svg" alt="DynamoDB" />
          <strong>Amazon DynamoDB:</strong> A lightning-fast NoSQL store for user-specific data with partition + sort key schema.
        </p>
        <p>
          <Icon src="/icons/aws/Asset-Package_02072025.dee42cd0a6eaacc3da1ad9519579357fb546f803 (1)/Architecture-Service-Icons_02072025/Arch_Networking-Content-Delivery/16/Arch_Amazon-API-Gateway_16.svg" alt="API Gateway" />
          <strong>API Gateway:</strong> Acts as a secure gateway for frontend requests, validating JWT tokens and routing to the right Lambda.
        </p>
        <p>
          <Icon src="/icons/aws/Asset-Package_02072025.dee42cd0a6eaacc3da1ad9519579357fb546f803 (1)/Architecture-Service-Icons_02072025/Arch_Security-Identity-Compliance/16/Arch_Amazon-Cognito_16.svg" alt="Cognito" />
          <strong>AWS Cognito:</strong> Identity provider issuing JWT tokens for secure, user-scoped access to backend services.
        </p>
      </Card>

      <Card title="Hosting & Security" icon={<ShieldCheck className="w-5 h-5 text-blue-500" />}>
        <p>
          <Icon src="/icons/aws/Asset-Package_02072025.dee42cd0a6eaacc3da1ad9519579357fb546f803 (1)/Architecture-Service-Icons_02072025/Arch_Networking-Content-Delivery/16/Arch_Amazon-CloudFront_16.svg" alt="CloudFront" />
          <strong>Amazon CloudFront:</strong> Global CDN that delivers static assets like HTML, CSS, and JS at low latency.
        </p>
        <p>
          <Icon src="/icons/aws/Asset-Package_02072025.dee42cd0a6eaacc3da1ad9519579357fb546f803 (1)/Architecture-Service-Icons_02072025/Arch_Storage/16/Arch_Amazon-S3-on-Outposts_16.svg" alt="S3" />
          <strong>Amazon S3:</strong> Stores and serves the React frontend as a static site, accessible via CloudFront.
        </p>
        <p>
          <Icon src="/icons/aws/Asset-Package_02072025.dee42cd0a6eaacc3da1ad9519579357fb546f803 (1)/Architecture-Service-Icons_02072025/Arch_Security-Identity-Compliance/16/Arch_AWS-IAM-Identity-Center_16.svg" alt="IAM" />
          <strong>AWS IAM:</strong> Grants precise, least-privilege access for each Lambda, ensuring functions only touch what they’re supposed to.
        </p>
                <p>
        <Icon src="/icons/aws/Asset-Package_02072025.dee42cd0a6eaacc3da1ad9519579357fb546f803 (1)/Architecture-Service-Icons_02072025/Arch_Security-Identity-Compliance/16/Arch_AWS-IAM-Identity-Center_16.svg" alt="IAM" />
          <strong>CORS (Cross-Origin Resource Sharing):</strong> Properly configured to allow your React frontend to talk to AWS securely.
        </p>
      </Card>

      <div className="bg-[#0B0C10] text-[#94A3B8] italic border-l-4 border-blue-600 pl-4 py-4">
        This app is fully serverless. There are no traditional servers to manage. Everything is on-demand, scalable, and personalized per user — all powered by AWS.
      </div>

      <div className="text-center text-[#94A3B8] border-t pt-6 mt-6">
        <p className="text-sm mb-3">Connect with me:</p>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-[#CBD5E1]">
          <a href="http://github.com/renaissancejlc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
            <Github className="w-5 h-5" /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/renaissancejlc/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
            <Linkedin className="w-5 h-5" /> LinkedIn
          </a>
          <a href="https://www.youtube.com/@nowbrowncow" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
            <Youtube className="w-5 h-5" /> YouTube
          </a>
          <a href="https://www.tiktok.com/@nowbrowncow" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
            <Music className="w-5 h-5" /> TikTok
          </a>
          <a href="https://www.tiktok.com/@nowbrowncow" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
            <TerminalSquare className="w-5 h-5" /> Dev Portfolio
          </a>
          <a href="https://renaissancecodes.wordpress.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
            <BookText className="w-5 h-5" /> Blog
          </a>
        </div>
      </div>
    </div>
  );
};

export default PoweredBy;