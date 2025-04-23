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
  sortOrder: 'none' | 'asc' | 'desc';
  setSortOrder: (val: 'none' | 'asc' | 'desc') => void;
}

const StudentFilter: FC<Props> = ({
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  sortOrder,
  setSortOrder,
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
        <Select
          value={sortOrder}
          onValueChange={(value) => setSortOrder(value as 'asc' | 'desc')}
        >
          <SelectTrigger className='w-[130px] border'>
            <SelectValue placeholder='Sort SSN' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='none'>No Sort</SelectItem>
            <SelectItem value='asc'>SSN ↑</SelectItem>
            <SelectItem value='desc'>SSN ↓</SelectItem>
          </SelectContent>
        </Select>
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
            <SelectItem value='No_family'>No Family</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default StudentFilter;
