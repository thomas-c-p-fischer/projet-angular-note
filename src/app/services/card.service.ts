import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private apiUrl = 'http://localhost:3000/card';

  constructor(private http: HttpClient) {}

  /**
   * Récupère toutes les cartes depuis le serveur.
   * @returns {Observable<Card[]>} Observable contenant la liste des cartes.
   */
  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>(this.apiUrl);
  }

  /**
   * Crée une nouvelle carte.
   * @param {Card} card - L'objet Card à créer.
   * @returns {Observable<Card>} Observable contenant la carte créée.
   */
  addCard(card: Card): Observable<Card> {
    return this.http.post<Card>(this.apiUrl, card);
  }

  /**
   * Met à jour une carte existante.
   * @param {Card} card - L'objet Card à mettre à jour.
   * @returns {Observable<Card>} Observable contenant la carte mise à jour.
   */
  updateCard(card: Card): Observable<Card> {
    return this.http.put<Card>(`${this.apiUrl}/${card.id}`, card);
  }

  /**
   * Supprime une carte par son ID.
   * @param {number} id - L'identifiant de la carte à supprimer.
   * @returns {Observable<void>} Observable sans contenu.
   */
  deleteCard(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
