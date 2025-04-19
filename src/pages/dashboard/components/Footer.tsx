import { FaGithub } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-blue-800 text-white text-center text-sm p-2 flex justify-between items-center">
    <div className="flex items-center gap-2">
      <span className="font-bold">Dormitory Management System</span>
      <span>- © 2025 by Database L03 - Team 08</span>
    </div>
    <a
      href="https://github.com"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-80"
    >
      <FaGithub className="text-white text-2xl" />
    </a>
  </footer>
);

export default Footer;