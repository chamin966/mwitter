import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

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
export const storageService = getStorage(firebaseApp);

/* 
코딩 설정을 동일하게 했는데 아무 오류가 뜨지 않고 파일 업로드는 되지 않는 분들
Storage 에서 Rules 탭에 가셔서 Rule이 다음과 같이 되어 있느지 확인해보세요
rules_version = '2';
service firebase.storage {
match /b/{bucket}/o {
match /{allPaths=**} {
allow read, write: if request.auth != null;
}
}
}

저같은 경우는 allow read, write: if false; 로 설정되어 있어서 계속 업로드가 안됐습니다. ㅠㅠ 3일 고생 ㅠㅠ
*/
