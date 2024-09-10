import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private apiUrl = 'http://localhost:3000/tag';

  constructor(private http: HttpClient) {}

  /**
   * Récupère tous les tags depuis le serveur.
   * @returns {Observable<Tag[]>} Observable contenant la liste des tags.
   */
  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.apiUrl);
  }

  /**
   * Crée un nouveau tag.
   * @param {Tag} tag - L'objet Tag à créer.
   * @returns {Observable<Tag>} Observable contenant le tag créé.
   */
  addTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(this.apiUrl, tag);
  }

  /**
   * Met à jour un tag existant.
   * @param {Tag} tag - L'objet Tag à mettre à jour.
   * @returns {Observable<Tag>} Observable contenant le tag mis à jour.
   */
  updateTag(tag: Tag): Observable<Tag> {
    return this.http.put<Tag>(`${this.apiUrl}/${tag.id}`, tag);
  }

  /**
   * Supprime un tag par son ID.
   * @param {number} id - L'identifiant du tag à supprimer.
   * @returns {Observable<void>} Observable sans contenu.
   */
  deleteTag(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
