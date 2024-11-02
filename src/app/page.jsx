import ChapterDropDown from "./components/ChapterDropDown";

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col">
      <section className="h-screen flex justify-center items-center">
        <h1 className="text-7xl text-primary">SKILL STACK</h1>
      </section>

      <section className="min-h-screen flex justify-center items-center">
        <ChapterDropDown chapterName={"Chapter 1: Introduction to Java Programming"}/>
      </section>
    </div>
  );

}
