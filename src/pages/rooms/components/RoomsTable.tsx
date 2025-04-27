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
          <TableHead>Max Students</TableHead>
          <TableHead>Current Students</TableHead>
          <TableHead>Occupancy Rate</TableHead>
          <TableHead className='text-center'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rooms.length > 0 ? (
          rooms.map((room, index) => (
            <TableRow key={index}>
              <TableCell>{room.room_id}</TableCell>
              <TableCell>{room.building_id}</TableCell>
              <TableCell>{room.max_num_of_students}</TableCell>
              <TableCell>{room.current_num_of_students}</TableCell>
              <TableCell>{room.occupancy_rate}</TableCell>
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
        ) : (
          <TableRow key='no-data'>
            <TableCell colSpan={6} className='text-center'>
              No rooms found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default RoomTable;
