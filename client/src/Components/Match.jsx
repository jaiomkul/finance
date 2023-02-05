import React, { useState, useEffect } from "react";

const Match = () => {
  const [data, setData] = useState([]);
  const [cibilScore, setCibilScore] = useState(0);
  const [minScore, setMinScore] = useState(300);
  const [maxScore, setMaxScore] = useState(900);
  const [minLoanAmounts, setMinLoanAmounts] = useState(0);
  const [minLoanAmount, setMinLoanAmount] = useState(0);
  const [maxLoanAmount, setMaxLoanAmount] = useState(10000);
  const [eligibility, setEligibility] = useState("");

  console.log(cibilScore);
  useEffect(() => {
    financerData();
  }, []);

  const financerData = async () => {
    try {
      const data = await fetch("http://localhost:8080/financiers");
      const res = await data.json();
      setData(res);
      console.log("Data ==>", res);
    } catch (error) {
      console.log("Error ==>", error);
    }
  };

  const handleCibilScore = (event) => {
    setCibilScore(event.target.value);
  };

  const handleLoanAmount = (event) => {
    setMinLoanAmount(event.target.value);
  };

  const checkEligibility = () => {
    if (
      cibilScore >= minScore &&
      cibilScore <= maxScore &&
      minLoanAmounts <= maxLoanAmount
    ) {
      setEligibility(`You are eligible for the loan.`);
    } else {
      setEligibility(
        `CIBIL score between ${minScore} and ${maxScore}, loan amount between ${minLoanAmounts} and ${maxLoanAmount}. You are not eligible for the loan.`
      );
    }
  };

  return (
    <div className="match">
      <div className="">
        <fieldset>
          <legend>
            <h3>Check Loan Eligibility</h3>
          </legend>

          <label>
            <input
              type="text"
              placeholder="Enter Loan Amount"
              onChange={handleLoanAmount}
              maxLength="4"
            />
          </label>
          <br />
          <br />
          <label>
            <input
              type="text"
              placeholder="Enter your CIBIL Score"
              onChange={handleCibilScore}
              maxLength="3"
            />
          </label>
          <br />
          <br />
          <input
            type="submit"
            value="Check Eligibility"
            className="btn"
            onClick={checkEligibility}
          />
          <br />
          <br />
          <h3 style={{ color: "red" }}>{eligibility}</h3>
        </fieldset>
      </div>

      <div>
        <h3>Financer list which match your data</h3>
        <table border={1} className="tables">
          <tr>
            <th>Financier Name</th>
            <th>Cibil Score</th>
          </tr>
          {cibilScore >= minScore
            ? data
                .filter((f) => f.loan_history[0].cibil_score <= cibilScore)
                .reverse()
                .map((e, i) => (
                  <tr key={i}>
                    <th>{e.name}</th>
                    <td>{e.loan_history[0].cibil_score}</td>
                  </tr>
                ))
            : null}
        </table>
      </div>
    </div>
  );
};

export default Match;
