import Main from "../../_components/wrappers/PageMain";
import RowWrapper from "../../_components/wrappers/RowWrapper";
import Hero from "./_components/Hero";
import Introduction from "./_components/Introduction";
import RegisterForm from "./_components/RegisterForm";

export default function Landing() {
  return (
    <Main>
      <RowWrapper className="w-full border-b border-b-black50">
        <Hero />
        <RegisterForm />
      </RowWrapper>
      <Introduction></Introduction>
    </Main>
  );
}
