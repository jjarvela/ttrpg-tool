import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import ServerThumb from "./ServerThumb";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";

type ExploreCarouselProps = {
  title: string;
  servers: {
    id: string;
    server_name: string;
    image: string | null;
    created_at: Date;
    description: string | null;
    config: {
      join_permission: string | null;
    }[];
    invitations: {
      expires: string;
      max_uses: number | null;
    }[];
    server_members: {
      user: {
        socket_id: string | null;
      };
    }[];
  }[];
};

export default async function ExploreCarousel({
  title,
  servers,
}: ExploreCarouselProps) {
  return (
    <ColumnWrapper align="content-start items-start w-full">
      <h3>{title}</h3>
      <div className="scrollbar-thin scroll-thumb-faint h-[80vh] w-[18rem] overflow-clip overflow-y-auto pt-2 sm:h-[11rem] sm:w-full sm:overflow-x-auto">
        <RowWrapper breakPoint="sm" className="py-4 sm:px-4 sm:py-0">
          {servers.map((server) => (
            <ServerThumb key={server.id} server={server} />
          ))}
        </RowWrapper>
      </div>
    </ColumnWrapper>
  );
}
