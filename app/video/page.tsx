import CondenseVideoClient from "./_components/condense-video-client";

const Page = () => {
  return (
    <div className="pt-32 mx-auto max-w-5xl">
      <div className="lg:grid lg:grid-cols-8 gap-10 lg:h-[calc(100dvh-130px)] pb-10 px-6 lg:px-0 flex flex-col">
        <CondenseVideoClient />
      </div>
    </div>
  );
};

export default Page;
