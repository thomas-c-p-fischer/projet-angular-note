import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';
import { TagService } from '../services/tag.service';
import { Card } from '../models/card.model';
import { Tag } from '../models/tag.model';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Column} from "../models/column.model";
import {ColumnService} from "../services/column.service";
import {NgForOf, NgIf} from "@angular/common";

interface DisplayCard extends Card {
  isAnswerShown?: boolean;
}

@Component({
  selector: 'app-cards',
  standalone: true,
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  imports: [FormsModule, ReactiveFormsModule, NgForOf, NgIf]
})
export class CardsComponent implements OnInit {
  cardForm: FormGroup;
  tagForm: FormGroup;
  tags: Tag[] = [];
  columns: Column[] = [];
  cards: DisplayCard[] = [];
  filteredCards: DisplayCard[] = [];
  showCardFormBool: boolean = false;
  showTagForm: boolean = false;
  selectedColumnId: string | null = null;

  constructor(
    private cardService: CardService,
    private tagService: TagService,
    private columnService: ColumnService,
    private fb: FormBuilder
  ) {
    this.cardForm = this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
      description: [''],
      tag: ['', Validators.required]
    });

    this.tagForm = this.fb.group({
      label: ['', Validators.required]
    });
  }

  /**
   * Initialise les données nécessaires lors de l'initialisation du composant.
   */
  ngOnInit(): void {
    this.loadTags();
    this.loadColumns();
    this.loadCards();
  }

  /**
   * Charge les tags depuis le service.
   */
  loadTags(): void {
    this.tagService.getTags().subscribe((tags: Tag[]) => {
      this.tags = tags;
    });
  }

  /**
   * Charge les colonnes triées par ordre depuis le service.
   */
  loadColumns(): void {
    this.columnService.getColumns().subscribe((columns: Column[]) => {
      this.columns = columns.sort((a, b) => a.order - b.order);
    });
  }

  /**
   * Charge les cartes depuis le service.
   */
  loadCards(): void {
    this.cardService.getCards().subscribe((cards: DisplayCard[]) => {
      this.cards = cards.map(card => ({ ...card, isAnswerShown: false }));
      this.filteredCards = cards;
      console.log('Cartes récupérées:', this.cards);
    });
  }

  /**
   * Filtre les cartes en fonction du tag sélectionné.
   * @param {Tag} tag Le tag sélectionné.
   */
  filterCardsByTag(tag: Tag): void {
    this.filteredCards = this.cards.filter(card => card.tag === tag.id);
  }

  /**
   * Retourne les cartes appartenant à une colonne donnée.
   * @param {string} columnId L'ID de la colonne.
   * @returns {Card[]} Les cartes de la colonne.
   */
  getCardsByColumn(columnId: string): DisplayCard[] {
    return this.filteredCards.filter(card => card.column === columnId);
  }

  /**
   * Affiche le formulaire pour ajouter une carte à une colonne donnée.
   * @param {string} columnId L'ID de la colonne sélectionnée.
   */
  showCardForm(columnId: string): void {
    this.selectedColumnId = columnId;
    this.showCardFormBool = true;
  }

  addCard() {
    if (this.cardForm.valid && this.selectedColumnId !== null) {
      const newCard: Card = {
        ...this.cardForm.value,
        column: this.selectedColumnId
      };

      this.cardService.addCard(newCard).subscribe(() => {
        this.loadCards();
        this.cardForm.reset();
        this.showCardFormBool = false;
      });
    }
  }

  /**
   * Ajoute un nouveau tag.
   */
  addTag(): void {
    if (this.tagForm.valid) {
      const newTag: Tag = this.tagForm.value;
      this.tagService.addTag(newTag).subscribe(() => {
        this.loadTags();
        this.showTagForm = false;
      });
    }
  }

  /**
   * Déplace une carte vers la colonne suivante.
   * @param {Card} card La carte à déplacer.
   */
  moveCardToNextColumn(card: Card): void {
    const currentColumn = this.columns.find(column => column.id === card.column);
    if (currentColumn) {
      const currentColumnOrder = currentColumn.order;
      const nextColumn = this.columns.find(column => column.order === currentColumnOrder + 1);

      if (nextColumn) {
        card.column = nextColumn.id;
        this.cardService.updateCard(card).subscribe(() => {
          this.loadCards();
        });
      }
    }
  }

  /**
   * Déplace une carte vers la colonne précédente.
   * @param {Card} card La carte à déplacer.
   */
  moveCardToPreviousColumn(card: Card): void {
    const currentColumn = this.columns.find(column => column.id === card.column);
    if (currentColumn) {
      const currentColumnOrder = currentColumn.order;
      const previousColumn = this.columns.find(column => column.order === currentColumnOrder - 1);

      if (previousColumn) {
        card.column = previousColumn.id;
        this.cardService.updateCard(card).subscribe(() => {
          this.loadCards();
        });
      }
    }
  }

  /**
   *  Dévoile ou cache la réponse
   */
  showAnswer(card: DisplayCard) {
    card.isAnswerShown = !card.isAnswerShown;
  }
}
