import {calculateInvestmentResults , formatter} from '../util/investment.js'

export default function Result({input}){

    const resultdata = calculateInvestmentResults(input);

    const initialInvestment = resultdata[0].valueEndOfYear - resultdata[0].interest - resultdata[0].annualInvestment;

    return (
        <table id='result'>
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Investment Value</th>
                    <th>Interest (year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>    
                </tr>
            </thead>
            <tbody>
                {resultdata.map(yeardata =>{

                    const TotalInterest = yeardata.valueEndOfYear - (yeardata.annualInvestment * yeardata.year) - initialInvestment;
                    const totalAmountInvested = yeardata.valueEndOfYear - TotalInterest;


                    return (
                        <tr key={yeardata.year}>
                            <td>{yeardata.year}</td>
                            <td>{formatter.format(yeardata.valueEndOfYear)}</td>
                            <td>{formatter.format(yeardata.interest)}</td>
                            <td>{formatter.format(TotalInterest)}</td>
                            <td>{formatter.format(totalAmountInvested)}</td>
                        </tr>
                    )
                })}
            </tbody>

        </table>
    )
}