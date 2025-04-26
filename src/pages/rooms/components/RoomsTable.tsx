import { FC } from 'react';
import { Room } from '@/services/roomsService';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Props {
  rooms: Room[];
  onView: (room: Room) => void;
}

const RoomTable: FC<Props> = ({ rooms, onView }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Room ID</TableHead>
          <TableHead>Building ID</TableHead>
          <TableHead>Max Capacity</TableHead>
          <TableHead>Current Students</TableHead>
          <TableHead>Underoccupied</TableHead>
          <TableHead className='text-center'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rooms.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className='text-center'>
              No rooms found
            </TableCell>
          </TableRow>
        ) : (
          rooms.map((room) => (
            <TableRow key={room.id}>
              <TableCell>{room.id}</TableCell>
              <TableCell>{room.buildingId}</TableCell>
              <TableCell>{room.maxCapacity}</TableCell>
              <TableCell>{room.currentStudents}</TableCell>
              <TableCell>{room.underoccupied ? 'Yes' : 'No'}</TableCell>
              <TableCell className='text-center'>
                <Button
                  size='sm'
                  className='bg-blue-100 hover:bg-blue-200'
                  onClick={() => onView(room)}
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default RoomTable;
