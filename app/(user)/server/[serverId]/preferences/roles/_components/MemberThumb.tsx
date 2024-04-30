import ProfilePicture from "@/app/_components/ProfilePicture";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import RowWrapper from "@/app/_components/wrappers/RowWrapper";
import RoleThumb from "./RoleThumb";
import RoleEdit from "./RoleEdit";

type MemberThumbProps = {
  serverAuth: ServerAuth;
  member: {
    id: number;
    server_id: string;
    member_id: string;
    role: string;
    nickname: string | null;
    icon: string | null;
    user: {
      username: string;
      screen_name: string | null;
      timezone: string | null;
      share_timezone: boolean | null;
      profile_image: string | null;
      socket_id: string | null;
      person_status: string | null;
    };
  };
  editable: boolean;
};
export default function MemberThumb({
  serverAuth,
  member,
  editable,
}: MemberThumbProps) {
  function setRoleColour(role: string) {
    if (role === "admin") {
      return "#ffdf40";
    }
    if (role === "moderator") {
      return "#48783d";
    }
    return "#182d8c";
  }
  return (
    <ColumnWrapper className="my-4 w-full">
      <RowWrapper breakPoint="sm" className="w-full">
        <RowWrapper>
          <ProfilePicture
            image={member.icon || member.user.profile_image || undefined}
            width={40}
            isActive={member.user.socket_id ? true : false}
          />
          <h4>{member.nickname || member.user.screen_name}</h4>
        </RowWrapper>
        <ColumnWrapper
          align="content-start items-start"
          className="mx-0 max-w-[50%] flex-grow border-x-[1px] border-black50 sm:px-8"
        >
          <p>Status</p>
          <small>{member.user.person_status || ""}</small>
        </ColumnWrapper>
        <ColumnWrapper align="content-start items-start">
          <p>Roles</p>
          <RowWrapper className="flex-wrap">
            <RoleThumb
              roleName={member.role}
              roleColour={setRoleColour(member.role)}
            />
          </RowWrapper>
        </ColumnWrapper>
      </RowWrapper>
      {editable && <RoleEdit serverAuth={serverAuth} member={member} />}
    </ColumnWrapper>
  );
}
