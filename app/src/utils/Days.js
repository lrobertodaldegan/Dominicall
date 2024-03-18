export const Days = {
  ofWeek:['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  label:(d=new Date()) => {
    let m = d.getMonth() + 1;
    m = m < 10 ? `0${m}` : m;

    return `${Days.ofWeek[d.getDay()]} ${d.getDate()}/${m}/${d.getFullYear()}`;
  }
}