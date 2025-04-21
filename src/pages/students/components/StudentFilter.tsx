import { FC } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import filter from '@/assets/filter.svg';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedStatus: string;
  setSelectedStatus: (val: string) => void;
}

const StudentFilter: FC<Props> = ({
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
}) => {
  return (
    <div className='mb-4 flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        <Input
          placeholder='Search student by ssn'
          className='w-64'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
        />
        <Button variant='secondary'>Search</Button>
      </div>
      <div className='flex items-center gap-2'>
        <img src={filter} alt='filter' className='h-6 w-6' />
        <Select
          value={selectedStatus}
          onValueChange={(value) => setSelectedStatus(value)}
        >
          <SelectTrigger className='w-[150px] border'>
            <SelectValue placeholder='All students' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All students</SelectItem>
            <SelectItem value='Active'>Active</SelectItem>
            <SelectItem value='Non_Active'>Non active</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default StudentFilter;
