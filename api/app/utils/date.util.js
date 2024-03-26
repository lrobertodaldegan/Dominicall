const days = [
  'Domingo', 
  'Segunda', 
  'Terça', 
  'Quarta', 
  'Quinta', 
  'Sexta', 
  'Sábado'
];

module.exports = {
  daysOfWeek:days,
  dateLabel:(d=new Date()) => {
    

    let m = d.getMonth() + 1;
    m = m < 10 ? `0${m}` : m;

    return `${days[d.getDay()]} ${d.getDate()}/${m}/${d.getFullYear()}`;
  },
  reportDateLabel:(d=new Date()) => {
    let m = d.getMonth() + 1;
    m = m < 10 ? `0${m}` : m;

    return `${days[d.getDay()]}_${d.getDate()}_${m}_${d.getFullYear()}`;
  },
};