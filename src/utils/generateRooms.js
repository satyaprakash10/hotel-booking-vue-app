export function generateMockRooms(count = 20) {
  const types = ["Deluxe", "Suite", "Standard", "Executive"];
  const rooms = [];

  for (let i = 1; i <= count; i++) {
    rooms.push({
      id: i,
      name: `${types[i % types.length]} Room ${i}`,
      description: `Comfortable ${types[i % types.length]} Room.`,
      guests: Math.floor(Math.random() * 5) + 1,
      price: 2000 + i * 75,
      image: `https://picsum.photos/seed/room-${i}/600/400`,
    });
  }

  return rooms;
}
