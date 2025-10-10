interface UtterancesCommentsProps {
  repo: string;
}

export default function UtterancesComments({ repo }: UtterancesCommentsProps) {
  return (
    <div
      id="utterances-container"
      data-repo={repo}
      data-issue-term="pathname"
      data-label="comment"
      className="utterances-wrapper mt-12"
    >
    </div>
  );
}
