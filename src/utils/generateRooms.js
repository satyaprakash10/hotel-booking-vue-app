export function generateMockRooms(count = 50) {
  const roomTypes = [
    "Deluxe",
    "Executive",
    "Family",
    "Luxury",
    "Standard",
    "Economy",
    "Superior",
    "Suite",
  ];
  const rooms = [];

  for (let i = 1; i <= count; i++) {
    const type = roomTypes[i % roomTypes.length];
    const capacity = Math.floor(Math.random() * 4) + 1; // 1 to 4 guests
    const price = 100 + capacity * 25 + Math.floor(Math.random() * 50); // dynamic pricing

    rooms.push({
      id: i,
      name: `${type} Room ${i}`,
      capacity,
      price,
      image: `https://picsum.photos/seed/room${i}/400/250`,
      description: `A comfortable ${type.toLowerCase()} room for up to ${capacity} guest(s).`,
    });
  }

  return rooms;
}
