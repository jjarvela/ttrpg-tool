import { ServerCharacterConfig } from "@prisma/client";
import ColumnWrapper from "../wrappers/ColumnWrapper";
import RowWrapper from "../wrappers/RowWrapper";
import CharacterPortrait from "./CharacterPortrait";
import ServerCharacterStatDisplay from "./ServerCharacterStatDisplay";
import errorHandler from "@/utils/errorHandler";
import { getServerMember } from "@/prisma/services/serverService";
import ProfilePicture from "../ProfilePicture";
import UsernameHover from "@/app/(user)/server/[serverId]/worldclock/_components/UsernameHover";
import ServerCharacterOwnerOptions from "./ServerCharacterOwnerOptions";

export default async function ServerCharacterDisplay({
  user_id,
  character,
  config,
}: {
  user_id: string;
  character: ServerCharacter;
  config: ServerCharacterConfig;
}) {
  const ownerIcon: JSX.Element | null = await errorHandler(
    async () => {
      if (character.base.owner_id === user_id) {
        return (
          <ServerCharacterOwnerOptions character={character} config={config} />
        );
      }

      const owner: ServerMember = await getServerMember(
        config.server_id,
        character.base.owner_id,
        true,
      );

      return (
        <UsernameHover username={owner.user!.username}>
          <ProfilePicture
            width={40}
            isActive={owner.user!.socket_id ? true : false}
            image={owner.icon || owner.user!.profile_image || undefined}
          />
        </UsernameHover>
      );
    },
    () => {
      return null;
    },
  );

  return (
    <ColumnWrapper
      className="bg-color-default border-50 w-[50vw] gap-0 overflow-hidden rounded-lg border-[1px] p-0 lg:w-[24rem]"
      align="content-start items-start"
    >
      <RowWrapper className="w-full px-2 pt-4" align="items-start">
        <div className="relative h-[7rem] w-[6rem] flex-shrink-0 overflow-hidden border-[1px] border-black50">
          {character.base.image && (
            <CharacterPortrait
              filename={character.base.image}
              alt={character.base.name}
            />
          )}
        </div>
        <ColumnWrapper align="items-start">
          <h4>{character.base.name}</h4>
          <p>{character.class}</p>
          <p>Lv. {character.level}</p>
        </ColumnWrapper>
        {ownerIcon && (
          <div className="flex flex-grow justify-end">{ownerIcon}</div>
        )}
      </RowWrapper>
      <ServerCharacterStatDisplay title="Status">
        <ColumnWrapper>
          <RowWrapper className="flex-wrap">
            {character.vitals.map((vital, index) => (
              <p key={config.vitals_names[index]} className="mr-4">
                <span className="mr-4">{config.vitals_names[index]}</span>
                <span>
                  {vital}/{character.vitals_max[index]}
                </span>
              </p>
            ))}
          </RowWrapper>
          <RowWrapper className="flex-wrap">
            {character.attributes.map((attribute, index) => (
              <p key={config.attributes_names[index]} className="mr-4">
                <span className="mr-4">{config.attributes_names[index]}</span>
                <span>{attribute}</span>
              </p>
            ))}
          </RowWrapper>
          <RowWrapper className="flex-wrap">
            {character.statics.map((stat, index) => (
              <p key={config.statics_names[index]} className="mr-4">
                <span className="mr-4">{config.statics_names[index]}</span>
                <span>{stat}</span>
              </p>
            ))}
          </RowWrapper>
        </ColumnWrapper>
      </ServerCharacterStatDisplay>
      <ServerCharacterStatDisplay title="Skills and inventory">
        <ColumnWrapper>
          <h5>Skills</h5>
          <p>{character.skills}</p>
          <h5>Inventory</h5>
          <p>{character.items}</p>
        </ColumnWrapper>
      </ServerCharacterStatDisplay>
    </ColumnWrapper>
  );
}
