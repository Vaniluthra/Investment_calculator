import Header from "./Components/Header/Header";
import Table from "./Components/Table/Table";
import InvestmentForm from "./Components/InvestmentForm/InvestmentForm";
import { useState } from "react";

function App() {

  const [userInput, setUserInput] = useState(null);
  const calculateHandler = (userInput) => {
    setUserInput(userInput);
  };
  const yearlyData = [];
  if (userInput) {
    
    let currentSavings = +userInput["current-savings"];
    const yearlyContribution = +userInput["yearly-contribution"];
    const expectedReturn = +userInput["expected-return"] / 100;
    const duration = +userInput["duration"];

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    <div>
      <Header></Header>
      <InvestmentForm onCalculate={calculateHandler}></InvestmentForm>
      {!userInput && <p><center>Please enter the values in above fields.</center></p>}
      {userInput && <Table data={yearlyData} initialInvestment={userInput["current-savings"]}></Table>}

      {/* Todo: Show below table conditionally (only once result data is available) */}
      {/* Show fallback text if no data is available */}
    </div>
  );
}

export default App;
