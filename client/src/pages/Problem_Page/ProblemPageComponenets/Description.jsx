import InfoRow from "./subComponents/InfoRow"

export default function Description({problem , setProblem}) {
  return (
    <div className="container dark:tw-text-white">


      <h1 className="mt-5 mb-4 tw-font-bold tw-text-6xl">{problem.name}</h1>
      <InfoRow problem={problem} setProblem={setProblem}/>
      <div className="mt-4 tw-prose tw-max-w-none dark:tw-prose-invert" dangerouslySetInnerHTML={{ __html: problem.description }} >
      </div>
    </div>
  )
}