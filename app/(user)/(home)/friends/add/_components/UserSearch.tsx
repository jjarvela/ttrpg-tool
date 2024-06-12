"use client";

import searchUsers from "@/actions/userRelationshipManagement/searchUsers";
import Divider from "@/app/_components/Divider";
import FeedbackCard from "@/app/_components/FeedbackCard";
import TextInput from "@/app/_components/inputs/TextInput";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import MaterialSymbolsLightSearchRounded from "@/public/icons/MaterialSymbolsLightSearchRounded";
import { useEffect, useState } from "react";
import ResultUserThumb from "./ResultUserThumb";

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
      <div className="md:max-w-[80%] lg:max-w-[40%]">
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
      </div>
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
              options={selectOptions(user)}
            />
          ))}
        </ColumnWrapper>
      )}
    </ColumnWrapper>
  );
  function selectOptions(
    user: Omit<UserResult, "person_status" | "socket_id">,
  ): "self" | "friend" | "stranger" {
    if (user.id === searcher_id) {
      return "self";
    }

    if (user.isFriend) {
      return "friend";
    }

    return "stranger";
  }
}
