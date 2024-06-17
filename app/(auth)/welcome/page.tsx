import Main from "../../_components/wrappers/PageMain";
import RowWrapper from "../../_components/wrappers/RowWrapper";
import Hero from "./_components/Hero";
import Introduction from "./_components/Introduction";
import LandingForm from "./_components/LandingForm";

export default function Landing() {
  return (
    <Main className="h-screen">
      <RowWrapper breakPoint="sm" className="w-full border-b border-b-black50">
        <Hero />
        <LandingForm />
      </RowWrapper>
      <Introduction></Introduction>
    </Main>
  );
}
