module.exports = {
  dateLabel:(d=new Date()) => {
    const days = [
      'Domingo', 
      'Segunda', 
      'Terça', 
      'Quarta', 
      'Quinta', 
      'Sexta', 
      'Sábado'
    ];

    let m = d.getMonth() + 1;
    m = m < 10 ? `0${m}` : m;

    return `${days[d.getDay()]} ${d.getDate()}/${m}/${d.getFullYear()}`;
  }
};