import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config={
    
        apiKey: "AIzaSyBC6nGDvrAUXxKYn4NlvSMeaELvefcX8-0",
        authDomain: "crwn-db-2828f.firebaseapp.com",
        databaseURL: "https://crwn-db-2828f.firebaseio.com",
        projectId: "crwn-db-2828f",
        storageBucket: "crwn-db-2828f.appspot.com",
        messagingSenderId: "545935937655",
        appId: "1:545935937655:web:f7795df48c066544787672",
        measurementId: "G-R8YTBWRYZS"
     
};
export const createUserProfileDocument=async (userAuth,additionalData)=>{
        if (!userAuth) return;
        

        const userRef=firestore.doc(`users/${userAuth.uid}`);
        const snapShot= await userRef.get();
        

        if(!snapShot.exists){
                const{displayName, email}=userAuth
                const createdAt=new Date();
                try{
                        await userRef.set({
                                displayName,
                                email,
                                createdAt,
                                ...additionalData
                        })

                }catch(error){
                        console.log('error creating user', error.message);

                }
        }
        return userRef;

        
}

export const addCollectionAndDocuments=async (collectionKey, objectsToAdd)=>{
        const collectionRef=firestore.collection(collectionKey);


        const batch=firestore.batch();
        objectsToAdd.forEach(obj=>{
                const newDocRef=collectionRef.doc();
                batch.set(newDocRef,obj);
        })

        return await batch.commit();    

        
}

export const convertCollectionsSnapshotToMap=(collections)=>{
        const transformedCollection=collections.docs.map(doc=>{
                const {title,items}=doc.data();


                return{
                        routeName:encodeURI(title.toLowerCase()),
                        id:doc.id,
                        title,
                        items
                }
        })
       
         return transformedCollection.reduce((accumulator , collection)=>{
                accumulator[collection.title.toLowerCase()]=collection;
                return accumulator;
         }, {});
}

firebase.initializeApp(config);

export const auth=firebase.auth();
export const firestore=firebase.firestore();

const provider=new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle=()=>auth.signInWithPopup(provider);

export default firebase;