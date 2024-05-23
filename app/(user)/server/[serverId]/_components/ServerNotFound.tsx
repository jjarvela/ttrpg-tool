import { redirect } from "next/navigation";
import Main from "@/app/_components/wrappers/PageMain";
import Button from "@/app/_components/Button";

export default function ServerNotFound() {
  return (
    <Main className="items-center justify-center gap-4">
      <h1>The server could not be found.</h1>
      <Button
        handleClick={async () => {
          "use server";
          redirect("/server/explore");
        }}
        className="btn-secondary"
      >
        Back to Explore
      </Button>
    </Main>
  );
}
