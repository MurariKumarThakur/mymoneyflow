import { Container } from "@material-ui/core";
import React, { useState } from "react";
import "./riskmangment.css";
const RiskMangment = () => {
  const [risk, setRisk] = useState(500);
  const [entry, setEntry] = useState();
  const [stopLoss, setStopLoss] = useState();
  const stopLossPerTrade = entry - stopLoss;
  const tradedQuantity = Math.ceil(risk / stopLossPerTrade);
  const target_1_2 = entry + stopLossPerTrade * 2;
  const target_1_3 = entry + stopLossPerTrade * 3;
  const totalInvestment = entry * tradedQuantity;
  const totalProfit = (target_1_2 - entry) * tradedQuantity;
  const totalLoss = risk;
  const totalProfit_in_per = Math.ceil(((target_1_2 - entry) * 100) / entry);
  const totalLoss_in_per = Math.ceil(((entry - stopLoss) * 100) / entry);
  let profitValue = "";
  let LossValue = "";
  if (totalProfit || totalLoss_in_per) {
    profitValue = totalProfit + " % " + totalProfit_in_per;
    LossValue = totalLoss + " % " + totalLoss_in_per;
  }
  const clarFields = () => {
    setEntry("")
    setStopLoss("")
  };

  return (
    <div className='risk_mangment'>
      <Container className='container'>
        <div className='calculartor'>
         
            <div>
              <h4>Risk Mangment Calculator</h4>{" "}
              <button className="clear_button" type='submit' onClick={() => clarFields()}>
                Clear fields
              </button>
            </div>
            <form class="myCalculatorForm" >
            <div className='risk'>
              <label>Risk You Want To Take</label>
              <input
                type='number'
                value={risk}
                onChange={(e) => {
                  setRisk(Number(e.target.value));
                }}
              />
            </div>

            <div className='entry'>
              <label>Entry Price</label>
              <input
                type='number'
                value={entry}
                onChange={(e) => {
                  setEntry(Number(e.target.value));
                }}
              />
            </div>
            <div className='stopLoss'>
              <label>Stop Loss Price</label>
              <input
                type='number'
                value={stopLoss}
                onChange={(e) => setStopLoss(Number(e.target.value))}
              />
              <div className='sl_pertrade'>
                <label>Stop Loss Per Share</label>
                <input type='number' disabled value={stopLossPerTrade} />
              </div>
            </div>
            <div className='total_share'>
              <label>Total Share To Trade</label>
              <input type='number' disabled value={tradedQuantity} />
            </div>

            <div className='target_1'>
              <label>Target(1:2)</label>
              <input type='number' disabled value={target_1_2} />
            </div>

            <div className='target_2'>
              <label>Target(1:3</label>
              <input type='number' disabled value={target_1_3} />
            </div>

            <div className='total_invest'>
              <label>Total Investemnt</label>
              <input type='number' value={totalInvestment} disabled />
            </div>

            <div className='total_profit'>
              <label>Total Profit</label>
              <input type='text' value={profitValue} disabled />
            </div>

            <div className='total_Loss'>
              <label>Total Loss</label>
              <input type='text' value={LossValue} disabled />
            </div>
            </form>
        </div>
      </Container>
    </div>
  );
};

export default RiskMangment;
