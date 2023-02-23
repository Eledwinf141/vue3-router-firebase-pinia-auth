import {defineStore} from 'pinia';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
    signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebaseConfig';
import { async } from '@firebase/util';
import router from '../router';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        userData: null,
    }),
    getters: {
        minusculas(state){
            return state.userData.toLowerCase();
        },
    },
    actions: {
     async registerUser(email,password){
        try {
           const {user} = await createUserWithEmailAndPassword(auth, email, password);
           console.log(user)
           this.userData = {email:user.email, ui:user.uid}
        } catch (error) {
            console.log(error)
        }
     },
     async loginUser(email,password){
        try {
         const {user} = await signInWithEmailAndPassword(auth,email,password)
         this.userData = {email: user.email, ui: user.uid}
        } catch (error) {
            
        }
     },
     async logOut(){
        try {
            await signOut(auth)
            this.userData = null
            router.push('login')
        } catch (error) {
            console.log(error)
        }
     },
     currentUser() {
        return new Promise((resolve,reject) =>{
             const unsuscribe = onAuthStateChanged( auth,user=> {
                if (user) {
                    this.userData = {email: user.email, uid: user.uid};
                } else {
                    this.userData= null
                }
                resolve(user)
             }, e => reject(e))
             unsuscribe();
        })
     }
    },
});