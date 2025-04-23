type Props = {
  onClick: () => void;
};

const StatisticDisplay = ({ onClick }: Props) => (
  <div className='flex items-center justify-between'>
    <span className='text-base font-medium text-gray-800'>
      Number of valid dorm cards
    </span>
    <button
      type='button'
      onClick={onClick}
      className='rounded-md bg-[#1488DB] px-5 py-2 text-sm font-medium text-white hover:bg-blue-700'
    >
      Get Data
    </button>
  </div>
);

export default StatisticDisplay;
