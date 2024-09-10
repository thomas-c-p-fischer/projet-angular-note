import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Column } from '../models/column.model';

/**
 * Service pour gérer les colonnes (Column).
 */
@Injectable({
  providedIn: 'root'
})
export class ColumnService {
  private apiUrl = 'http://localhost:3000/column';  // URL de l'API REST pour les colonnes

  constructor(private http: HttpClient) {}

  /**
   * Récupère toutes les colonnes disponibles depuis le serveur.
   * @returns {Observable<Column[]>} Un observable contenant la liste des colonnes.
   */
  getColumns(): Observable<Column[]> {
    return this.http.get<Column[]>(this.apiUrl);
  }
}
