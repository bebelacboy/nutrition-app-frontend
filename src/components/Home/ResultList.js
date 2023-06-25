import { ResultDetail } from "./ResultDetail";

export const ResultList = ({ resultSet }) => {
  const view = resultSet.map((result) => {
    return <ResultDetail key={result.name} result={result}/>;
  });
  return view;
}