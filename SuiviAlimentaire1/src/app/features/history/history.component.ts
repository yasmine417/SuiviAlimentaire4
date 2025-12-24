import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CaloriesRecord, CaloriesRecordService } from '../../core/services/repas.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  today = new Date();
  loading = false;
  error: string | null = null;

  searchTerm = '';
  showForm = false;
  selectedRecord: CaloriesRecord | null = null;

  records: CaloriesRecord[] = [];
  filteredRecords: CaloriesRecord[] = [];

  constructor(private recordService: CaloriesRecordService) {}

  ngOnInit(): void {
    this.loadRecords();
  }

  loadRecords(): void {
    this.loading = true;
    this.error = null;

    this.recordService.getAllRecords().subscribe({
      next: (data) => {
        this.records = data;
        this.filterRecords();
        this.loading = false;
      },
      error: (err) => {
        this.error = `Erreur de connexion: ${err.message}. Vérifiez que le backend IA est démarré sur le port correct.`;
        this.loading = false;
      }
    });
  }

  getTotalCalories(): number {
    return this.filteredRecords.reduce((sum, r) => sum + Number(r.calories || 0), 0);
  }

  filterRecords(): void {
    this.filteredRecords = this.records.filter(r =>
      r.mealName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearchChange(): void {
    this.filterRecords();
  }

  selectRecord(record: CaloriesRecord): void {
    this.selectedRecord = record;
  }

  closeModal(): void {
    this.selectedRecord = null;
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
