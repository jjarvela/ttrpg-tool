import Icon from "@/app/_components/Icon";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import ServerIcon from "./ServerIcon";
import Link from "next/link";

type ServerThumbProps = {
  server: {
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
  };
};

export default function ServerThumb({ server }: ServerThumbProps) {
  return (
    <ColumnWrapper className="card-back h-[9rem] w-[16rem] flex-shrink-0 gap-0 rounded-xl px-0 py-1 duration-150 ease-linear hover:-translate-y-[0.5rem]">
      <RowWrapper
        className="gap-4"
        justify="justify-items-start w-full mb-0 h-[45%] pt-2 pl-2"
      >
        <ServerIcon
          server={server}
          icon={<Icon filename={server.image || ""} alt={server.server_name} />}
        />
        <Link href={`/server/${server.id}`}>
          <h5 className="hover:text-accent-gradient">{server.server_name}</h5>
        </Link>
      </RowWrapper>
      <ColumnWrapper
        className="m-0 w-[90%] flex-grow p-0"
        justify="justify-between justify-items-between"
      >
        <p className="hover:text-color-default line-clamp-2 w-full text-ellipsis text-wrap break-words text-black50">
          {server.description}
        </p>
        <RowWrapper
          className="m-0 w-full p-0"
          justify="justify-evenly justify-items-evenly"
        >
          <span className="text-xs text-accent">
            {
              server.server_members.filter((member) => member.user.socket_id)
                .length
            }{" "}
            Online
          </span>{" "}
          <span className="text-xs">
            {server.server_members.length} Members
          </span>
        </RowWrapper>
      </ColumnWrapper>
    </ColumnWrapper>
  );
}
