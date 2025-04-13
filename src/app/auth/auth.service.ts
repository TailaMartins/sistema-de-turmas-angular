import { inject, Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
  user,
} from '@angular/fire/auth';
import { Firestore, getDoc } from '@angular/fire/firestore';
import { doc } from 'firebase/firestore';
import { BehaviorSubject, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  isAdminLoggedIn$ = this.isAdminSubject.asObservable();

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  async loginWithGoogle(): Promise<{ email: string | null; isAdmin: boolean }> {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.auth, provider);
    const email = result.user.email;

    if (!email) return { email: null, isAdmin: false };

    const adminRef = doc(this.firestore, 'admins', email);
    const adminSnap = await getDoc(adminRef);
    const isAdmin = adminSnap.exists();
    this.isAdminSubject.next(isAdmin);

    return { email, isAdmin };
  }

  getUser(): Observable<User | null> {
    return user(this.auth);
  }

  logout() {
    this.isAdminSubject.next(false);
    return signOut(this.auth);
  }
}
