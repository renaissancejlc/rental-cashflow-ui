import { Github, Youtube, Linkedin, Mail, BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full text-center py-4 mt-8 border-t border-gray-700 shadow-md shadow-gray-800/10 text-white text-sm">
      <p>
        © {new Date().getFullYear()} Rental Cashflow App. All rights reserved.
      </p>
      {/* Social footer */}
      <div className="w-full mt-24 flex flex-col items-center z-10 relative">
        <p className="text-center text-xs italic text-gray-500 mb-2">Connect with me</p>
        <p className="text-center text-xs italic text-gray-500 mb-2">Connect with me</p>
        <footer className="mb-8 flex justify-center gap-6 text-gray-500 text-xl">
          <a href="https://github.com/renaissancejlc" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="hover:text-blue-400" />
          </a>
          <a href="https://youtube.com/nowbrowncow" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
            <Youtube className="hover:text-blue-400" />
          </a>
          <a href="https://linkedin.com/in/renaissancejlc" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="hover:text-blue-400" />
          </a>
          <a href="mailto:renysportfolio@gmail.com" aria-label="Email">
            <Mail className="hover:text-blue-400" />
          </a>
          <a href="https://renaissancecodes.wordpress.com/" aria-label="Blog">
            <BookOpen className="hover:text-blue-400" />
          </a>
        </footer>
      </div>
    </footer>
  );
};

export default Footer;