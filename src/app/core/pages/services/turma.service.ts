import { inject, Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  private firestore = inject(Firestore);

  adicionarTexto(turma: string, texto: string) {
    const turmaRef = doc(this.firestore, `turmas/${turma}`);
    return setDoc(turmaRef, { texto });
  }

  getTextoTurma(turmaId: string): Observable<string> {
    const turmaRef = doc(this.firestore, `turmas/${turmaId}`);
    return docData(turmaRef).pipe(
      map(data => (data && 'texto' in data ? data['texto'] as string : ''))
    );
  }

  getTurmas(): Observable<any[]> {
    const turmaCollection = collection(this.firestore, 'turmas');
    return collectionData(turmaCollection, { idField: 'id' });
  }

  removerTexto(turmaId: string) {
    const turmaRef = doc(this.firestore, `turmas/${turmaId}`);
    return deleteDoc(turmaRef);
  }



}
