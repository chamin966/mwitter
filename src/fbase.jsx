import { initializeApp } from '../node_modules/firebase/app';
import { getAuth } from '../node_modules/firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAQ18OEfPV-zua2lwzSLu2grQOkObMytLo',
  authDomain: 'mwitter-d01d2.firebaseapp.com',
  projectId: 'mwitter-d01d2',
  storageBucket: 'mwitter-d01d2.appspot.com',
  messagingSenderId: '819288233709',
  appId: '1:819288233709:web:59ed734019fc4de3e31ee4',
};

const firebaseApp = initializeApp(firebaseConfig);
// 버전 9부터 auth 는 요런식으로 가져와야 합니다.
const authService = getAuth(firebaseApp);
export default authService;
