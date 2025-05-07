let days = [];
lastId = 0;

function simulateDay() {
  let customers = Math.round(Math.random() * (625 - 200) + 200);
  let conversion = Math.random() * (20 - 10) + 10;
  let transactions = customers * (conversion / 100);

  let items = 0;
  for (let i = 0; i < transactions; i++) {
    items += Math.round(Math.random() * (3 - 1) + 1);
  }
  let ipt = items / transactions;
  let atv = Math.random() * (110 - 70) + 70;
  let earnings = atv * transactions;

  const dayNum = ++lastId;
  const newDay = {
    dayNum,
    customers,
    transactions: Math.round(transactions),
    items: Math.round(items),
    earnings: Number(earnings.toFixed(2)),
    ipt: Number(ipt.toFixed(2)),
    atv: Number(atv.toFixed(2)),
    conversion: Number(conversion.toFixed(2)),
  };

  days.push(newDay);
  return newDay;
}

function getWeek() {
  const lastWeek = days.slice(-7);
  const result = lastWeek.reduce((obj, item) => {
    obj[item.dayNum] = item.earnings;
    return obj;
  }, {});
  return result;
}

function removeDayById(id) {
  const index = days.findIndex((d) => d.dayNum === id);
  if (index !== -1) {
    days.splice(index, 1);
    return true;
  }
  return false;
}

module.exports = {
  days,
  simulateDay,
  getWeek,
  removeDayById,
};
