import { useState, useRef } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '@/utils/authUtil';
import { useClickOutside } from '@/hooks/useClickOutSide';

const Userbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='userbar-button focus:outline-none'
      >
        <FaUserCircle className='text-3xl' />
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-2 w-48 rounded-md bg-white text-black shadow-lg'>
          <ul>
            <li></li>
            <li>
              <button
                onClick={() => logoutUser(navigate)}
                className='block w-full px-4 py-2 text-left hover:bg-blue-100 hover:text-blue-800'
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Userbar;
