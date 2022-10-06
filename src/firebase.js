// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
 //apikeyなど
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
export const createUser = (email, password) => {

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert("登録完了")
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("登録失敗")
      // ..
    });
}

export const loginUser = (email, password) => {

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      alert("login成功")
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("login失敗")
    });
}

export const logout = () => {

  signOut(auth).then(() => {
    // Sign-out successful.
    alert("logoutしました")
  }).catch((error) => {
    // An error happened.
  });
}



import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { reactive, ref } from "vue";


onAuthStateChanged(auth, async (user) => {


  if (!user) {
    console.log('ログアウト状態です')
  }
  // ログイン時
  else {
    // ログイン済みユーザー情報
    const docRef = doc(db, "users", user.uid)
    const userDoc = await getDoc(docRef)
    if (!userDoc.exists()) {
      // Firestore にユーザー用のドキュメントが作られていなければ作る
      setDoc(docRef,
        {
          userID: user.uid,
          username: 'no name',
          created_at: Timestamp.now(),
          belonging: 'no belonging'
        });
    }
  }
});

export const getUserData = async () => {
  const userID = auth.currentUser.uid

  const docRef = doc(db, "users", userID);
  const docSnap = await getDoc(docRef);
  let userData
  if (docSnap.exists()) {
    userData = docSnap.data();

  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
  return userData

}

import { updateDoc } from "firebase/firestore";
export const updateData = async (data) => {
  const userID = auth.currentUser.uid
  const userRef = doc(db, "users", userID);

  await updateDoc(userRef, {
    username: data.username,
    updated_at: Timestamp.now(),
    belonging: data.belonging
  }).then(()=>{
    alert("ユーザーデータを更新しました");
  }).catch((error)=>{
    alert("データの更新に失敗しました",error)
  });
}

import { collection, query, where, onSnapshot  } from "firebase/firestore";
import { onUnmounted } from "vue";
export const updateStockItems = () => {
  let stockItems = reactive([])
  const q = query(collection(db, "stockItems"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        stockItems.push({
          ...change.doc.data()
        })
       
      }
      if (change.type === "modified") {
        stockItems.forEach(function(item, index) {
         
          if(item.itemId===change.doc.data().itemId){
           stockItems[index] = change.doc.data()
          }
        })
      }
      if (change.type === "removed") {
        stockItems.forEach(function(item, index) {
          if(item.name===change.doc.name){
            stockItems.splice(index,1)
          }
        })
      
      }
    });
  },
  (error)=>{
    console.log(error)
  }
  );
  onUnmounted(unsubscribe)
  
  return stockItems
}

export const editStockItem =async(itemId,editData)=>{
  await setDoc(doc(db, "stockItems", itemId), editData);
}
