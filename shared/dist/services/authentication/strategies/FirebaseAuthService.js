"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("firebase/auth");
const firebaseConfig_1 = require("../../../config/firebaseConfig");
const auth = (0, auth_1.getAuth)(firebaseConfig_1.default);
const FirebaseAuthService = {
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userCredential = yield (0, auth_1.signInWithEmailAndPassword)(auth, email, password);
            return {
                uid: userCredential.user.uid,
                name: userCredential.user.displayName || '',
                email: userCredential.user.email || '',
            };
        });
    },
    register(email, name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userCredential = yield (0, auth_1.createUserWithEmailAndPassword)(auth, email, password);
            if (userCredential.user) {
                yield (0, auth_1.updateProfile)(userCredential.user, {
                    displayName: name,
                });
            }
            return {
                uid: userCredential.user.uid,
                name: userCredential.user.displayName || '',
                email: userCredential.user.email || '',
            };
        });
    },
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, auth_1.signOut)(auth);
        });
    },
    onAuthStateChanged(callback) {
        return (0, auth_1.onAuthStateChanged)(auth, (firebaseUser) => {
            if (firebaseUser) {
                callback({
                    uid: firebaseUser.uid,
                    name: firebaseUser.displayName || '',
                    email: firebaseUser.email || '',
                });
            }
            else {
                callback(null);
            }
        });
    },
    resetPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, auth_1.sendPasswordResetEmail)(auth, email);
        });
    },
};
exports.default = FirebaseAuthService;
