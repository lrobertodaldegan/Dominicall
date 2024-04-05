const API_BASE_PATH = 'https://lucasrobertodev.com.br/dominicall/';//'http://192.168.100.33:21017/dominicall/';

export const Texts = {
  Insta:'https://www.instagram.com/lucasrobertodev/',
  GooglePlay: 'https://play.google.com/store/apps/developer?id=Lucas+Roberto+Daldegan',
  GooglePlayPro: 'https://play.google.com/store/apps/details?id=com.dominicallpro',
  Avalie: 'https://play.google.com/store/apps/details?id=com.dominicall',
  Cache:{
    group:'@group',
    jwt: '@jwt',
    user: '@user',
    licenseModal: '@lm'
  },
  License:{
    info:'Para continuar usando todas as funcionalidades do Dominicall você precisará ativar sua licença e isso é muito fácil:\n\nCada licença tem o valor de R$ 10,00. Para ativar a sua, informe seu melhor e-mail e toque no botão abaixo. Em seguida te enviaremos os dados para pagamento por e-mail. Assim que o pagamento for processado, sua licença será atualizada automaticamente!\n\nPara maiores esclarecimentos, entre em contato com a gente!\n\nAtenciosamente,\nLucas Roberto - Equipe Dominicall',
  },
  API: {
    signup: `${API_BASE_PATH}auth/signup`,
    signin: `${API_BASE_PATH}auth/signin`,
    firstAccess: `${API_BASE_PATH}auth/fa`,
    signout: `${API_BASE_PATH}auth/signout`,
    requestResetCode: `${API_BASE_PATH}user/forgot`,
    confirmResetCode: `${API_BASE_PATH}user/code`,
    user: `${API_BASE_PATH}user`,
    group: `${API_BASE_PATH}group`,
    member: `${API_BASE_PATH}group/member`,
    class: `${API_BASE_PATH}class`,
    visitors: `${API_BASE_PATH}class/visitor`,
    students: `${API_BASE_PATH}class/student`,
    presences: `${API_BASE_PATH}class/presence`,
    offers: `${API_BASE_PATH}class/offer`,
    events: `${API_BASE_PATH}class/event`,
    teachers: `${API_BASE_PATH}class/teacher`,
    report: `${API_BASE_PATH}report`,
    users: `${API_BASE_PATH}users`,
    finance: `${API_BASE_PATH}finance`,
    license: `${API_BASE_PATH}license`,
    reports: {
      general:`${API_BASE_PATH}report`,
      finance:`${API_BASE_PATH}report/finance`,
      calendar:`${API_BASE_PATH}report/calendar`,
      students:`${API_BASE_PATH}report/students`,
    },
  },
}