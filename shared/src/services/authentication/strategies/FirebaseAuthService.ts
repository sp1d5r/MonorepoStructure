import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  User as FirebaseUser,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import AuthService from '../AuthenticationInterface';
import app from '../../../config/firebaseConfig';
import { User } from '../../../types/User';

const auth = getAuth(app);

const mapFirebaseUserToUser = async (firebaseUser: FirebaseUser): Promise<User> => {
  const token = await firebaseUser.getIdToken();
  return {
    uid: firebaseUser.uid,
    name: firebaseUser.displayName || '',
    email: firebaseUser.email || '',
    token,
  };
};

const FirebaseAuthService: AuthService = {
  async login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return mapFirebaseUserToUser(userCredential.user);
  },

  async register(email: string, name: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: name,
      });
    }
    return mapFirebaseUserToUser(userCredential.user);
  },

  async logout() {
    await signOut(auth);
  },

  onAuthStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const user = await mapFirebaseUserToUser(firebaseUser);
        callback(user);
      } else {
        callback(null);
      }
    });
  },

  async loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return mapFirebaseUserToUser(userCredential.user);
  },

  async resetPassword(email: string) {
    await sendPasswordResetEmail(auth, email);
  },

  async getToken(): Promise<string | null> {
    const currentUser = auth.currentUser;
    if (!currentUser) return null;
    return currentUser.getIdToken();
  },

  async refreshToken(): Promise<string | null> {
    const currentUser = auth.currentUser;
    if (!currentUser) return null;
    return currentUser.getIdToken(true); // Force refresh the token
  },
};

export default FirebaseAuthService;
