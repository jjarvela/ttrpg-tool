"use client";

import searchUsers from "@/actions/userRelationshipManagement/searchUsers";
import Divider from "@/app/_components/Divider";
import FeedbackCard from "@/app/_components/FeedbackCard";
import TextInput from "@/app/_components/inputs/TextInput";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import MaterialSymbolsLightSearchRounded from "@/public/icons/MaterialSymbolsLightSearchRounded";
import { useEffect, useState } from "react";
import ResultUserThumb from "./ResultUserThumb";
import SelfOptionsElement from "../../../_components/SelfOptionsElement";
import FriendOptionsElement from "../../../_components/FriendOptionsElement";
import StrangerOptionsElement from "../../../_components/StrangerOptionsElement";

interface UserResult extends UserBasic {
  isFriend: boolean;
}

export default function UserSearch({ searcher_id }: { searcher_id: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<
    Omit<UserResult, "person_status" | "socket_id">[]
  >([]);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    if (searchTerm !== "") {
      searchUsers(searchTerm)
        .then((result) => setUsers(result))
        .catch(() =>
          setError("Something went wrong. Please refresh the page."),
        );
    }
  }, [searchTerm]);

  return (
    <ColumnWrapper className="w-full">
      <TextInput
        value={searchTerm}
        placeholder="Find users..."
        onChange={(e) => setSearchTerm(e.target.value)}
        endElement={
          <button className="text-default text-xl">
            <MaterialSymbolsLightSearchRounded />
          </button>
        }
      />
      <Divider />

      {error !== "" && <FeedbackCard type="error" message={error} />}
      {
        /**Search term is set but the return array was empty */
        searchTerm !== "" && users.length < 1 && (
          <p>No user matches your search</p>
        )
      }
      {users.length > 0 && (
        <ColumnWrapper className="w-full">
          {users.map((user) => (
            <ResultUserThumb
              key={user.id}
              user={user}
              optionsElement={selectOptionsElement(user)}
            />
          ))}
        </ColumnWrapper>
      )}
    </ColumnWrapper>
  );
  function selectOptionsElement(
    user: Omit<UserResult, "person_status" | "socket_id">,
  ): React.ReactNode {
    if (user.id === searcher_id) {
      return <SelfOptionsElement user_id={user.id} />;
    }

    if (user.isFriend) {
      return (
        <FriendOptionsElement
          name={user.screen_name || user.username}
          user_id={user.id}
        />
      );
    }

    return (
      <StrangerOptionsElement
        name={user.screen_name || user.username}
        user_id={user.id}
      />
    );
  }
}
