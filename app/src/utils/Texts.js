const API_BASE_PATH = 'http://localhost:21017/dominicall/';

export const Texts = {
  Insta:'https://www.instagram.com/lucasrobertodev/',
  GooglePlay: 'https://play.google.com/store/apps/developer?id=Lucas+Roberto+Daldegan',
  Avalie: 'https://play.google.com/store/apps/details?id=com.dominicall',
  API: {
    signup: `${API_BASE_PATH}auth/signup`,
    signin: `${API_BASE_PATH}auth/signin`,
    signout: `${API_BASE_PATH}auth/signout`,
    requestResetCode: `${API_BASE_PATH}user/forgot`,
    confirmResetCode: `${API_BASE_PATH}user/code`,
    confirmReset: `${API_BASE_PATH}user`,
    group: `${API_BASE_PATH}group`,
    member: `${API_BASE_PATH}group/member`,
    class: `${API_BASE_PATH}class`,
    visitors: `${API_BASE_PATH}class/visitor`,
    students: `${API_BASE_PATH}class/student`,
    presences: `${API_BASE_PATH}class/presence`,
    offers: `${API_BASE_PATH}class/offer`,
    events: `${API_BASE_PATH}class/event`,
    teachers: `${API_BASE_PATH}class/teachers`,
  }
}