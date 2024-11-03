import ChapterDropDown from "./components/ChapterDropDown";
import BackgroundCode from "./components/BackgroundCode";
import Button from "./components/Button";
export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="absolute top-7 left-7 -z-10 text-primary/25">
        <BackgroundCode/>
      </div>
      <div className="absolute top-7 right-7 flex gap-3">
        <Button name={"Register"} fill={false} />
        <Button name={"Login"} fill={true} />
      </div>

      <section className="h-screen flex justify-center items-center flex-col">
        <h1 className="text-7xl text-primary font-bold mb-2">Skill Stack</h1>
        <h4 className="text-3xl text-secondary font-light">Build Your Skills, One Line at a Time!</h4>
      </section>

      <section className="min-h-screen">
        <ChapterDropDown chapterName={"Chapter 1: Introduction to Java Programming"}/>
        <ChapterDropDown chapterName={"Chapter 2: Primitive Data and Definite Loops"}/>
        <ChapterDropDown chapterName={"Chapter 3: Parameters and Objects"}/>
      </section>
    </div>
  );

}
