export const Days = {
  ofWeek:['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  label:(d=new Date()) => {
    let di = d.getDate();
    di = di < 10 ? `0${di}` : di;

    let m = d.getMonth() + 1;
    m = m < 10 ? `0${m}` : m;

    return `${Days.ofWeek[d.getDay()]} ${di}/${m}/${d.getFullYear()}`;
  },
  simpleLabel:(d=new Date()) => {
    let di = d.getDate();
    di = di < 10 ? `0${di}` : di;

    let m = d.getMonth() + 1;
    m = m < 10 ? `0${m}` : m;

    return `${di}/${m}/${d.getFullYear()}`;
  }
}