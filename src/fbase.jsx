import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAQ18OEfPV-zua2lwzSLu2grQOkObMytLo',
  authDomain: 'mwitter-d01d2.firebaseapp.com',
  projectId: 'mwitter-d01d2',
  storageBucket: 'mwitter-d01d2.appspot.com',
  messagingSenderId: '819288233709',
  appId: '1:819288233709:web:59ed734019fc4de3e31ee4',
};

const firebaseApp = initializeApp(firebaseConfig); //파이어베이스를 사용하겠다는 초기화

// 버전 9부터는 요런식으로 가져와야 합니다.
//내가 가진 파이어베이스 DB를 사용할 수 있도록 해주는 변수를 export
export const authService = getAuth(firebaseApp);
export const dbService = getFirestore(firebaseApp);
