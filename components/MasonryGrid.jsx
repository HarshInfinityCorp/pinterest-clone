import PinCard from "./PinCard";

export default function MasonryGrid({ pins }) {
  return (
    <div className="masonry-grid px-4">
      {pins.map((pin) => (
        <PinCard key={pin.id} pin={pin} />
      ))}
    </div>
  );
}
