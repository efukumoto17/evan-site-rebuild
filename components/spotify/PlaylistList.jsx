import CardItem from "./CardItem";
import CardItemGrid from "./CardItemGrid";


export default function PlaylistList({ playlists }) {
  return (
    <CardItemGrid>
      {playlists?.map((playlist) => (
        <CardItem
          key={playlist.id}
          id={playlist.id}
          heading={playlist.name}
          subheading={playlist.description}
          altTitle={playlist.name}
          images={playlist.images}
          type="playlist"
        />
      ))}
    </CardItemGrid>
  );
}
