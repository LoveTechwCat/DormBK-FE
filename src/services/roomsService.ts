// src/services/roomService.ts
import axios from 'axios';

export interface Room {
  building_id: string;
  room_id: string;
  max_num_of_students: number;
  current_num_of_students: number;
  occupancy_rate: string;
}

export const getAllRooms = async (): Promise<Room[]> => {
  const res = await axios.get<Room[]>('/api/rooms/');
  return res.data;
};

export const getUnderoccupiedRooms = async (): Promise<Room[]> => {
  const res = await axios.get<Room[]>('/api/rooms/underoccupied');
  return res.data;
};

export const getRoomsByBuilding = async (
  buildingId: string,
): Promise<Room[]> => {
  const res = await axios.get<Room[]>(`/api/rooms/${buildingId}`);
  return res.data;
};

export const getUnderoccupiedRoomsByBuilding = async (
  buildingId: string,
): Promise<Room[]> => {
  const res = await axios.get<Room[]>(`/api/rooms/underoccupied/${buildingId}`);
  return res.data;
};

// export const checkUnderoccupiedRoom = async (
//   buildingId: string,
//   roomId: string,
// ): Promise<Room[]> => {
//   const res = await axios.get<Room[]>(
//     `/api/rooms/underoccupied/${buildingId}/${roomId}`,
//   );
//   return res.data;
// };
