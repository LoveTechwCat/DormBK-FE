import { useState, useEffect } from 'react';
import RoomHeader from './components/RoomsHeader';
import RoomFilter from './components/RoomsFilter';
import RoomTable from './components/RoomsTable';
import RoomDetailDialog from './components/RoomsDetailDialog';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import {
  Room,
  getUnderoccupiedRooms,
  getUnderoccupiedRoomsByBuilding,
} from '@/services/roomsService';
import { toast } from 'react-hot-toast';

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('all');
  const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('none');

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const data = await getUnderoccupiedRooms();
      setRooms(data);
      setFilteredRooms(data);
    } catch {
      toast.error('Failed to fetch rooms');
    }
  };

  const fetchRoomsByBuilding = async (buildingId: string) => {
    try {
      const data = await getUnderoccupiedRoomsByBuilding(buildingId);
      setFilteredRooms(data);
    } catch {
      toast.error('Failed to fetch rooms by building');
    }
  };

  useEffect(() => {
    if (selectedBuilding === 'all') {
      setFilteredRooms(
        rooms.filter((room) =>
          room.id.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
    } else {
      fetchRoomsByBuilding(selectedBuilding);
    }
  }, [selectedBuilding]);

  useEffect(() => {
    let filtered = [...filteredRooms];

    if (searchQuery) {
      filtered = filtered.filter((room) =>
        room.id.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (sortOrder !== 'none') {
      filtered.sort((a, b) =>
        sortOrder === 'asc'
          ? a.id.localeCompare(b.id)
          : b.id.localeCompare(a.id),
      );
    }

    setFilteredRooms(filtered);
  }, [searchQuery, sortOrder]);

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Header />
      <div className='flex flex-1'>
        <Sidebar />
        <main className='flex flex-1 flex-col justify-between bg-gray-100'>
          <div className='px-8 py-6'>
            <RoomHeader />
            <div className='rounded-xl bg-white p-6 shadow-md'>
              <h2 className='mb-4 text-2xl font-semibold text-gray-700'>
                Room List
              </h2>
              <RoomFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedBuilding={selectedBuilding}
                setSelectedBuilding={setSelectedBuilding}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
              <div className='mt-4 rounded-md border'>
                <RoomTable
                  rooms={filteredRooms}
                  onView={(room) => {
                    setSelectedRoom(room);
                    setOpenDialog(true);
                  }}
                />
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>

      {selectedRoom && (
        <RoomDetailDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          room={selectedRoom}
        />
      )}
    </div>
  );
};

export default Rooms;
