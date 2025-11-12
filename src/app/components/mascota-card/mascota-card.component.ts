import { Component, Input } from '@angular/core';

export interface Mascota {
  id: number;
  nombre: string;
  especie?: string;
  raza?: string;
  imagenUrls?: string[];
}

@Component({
  selector: 'app-mascota-card',
  templateUrl: './mascota-card.component.html',
  styleUrls: ['./mascota-card.component.scss']
})
export class MascotaCardComponent {
  @Input() mascota!: Mascota;

  get imagenPrincipal(): string | null {
    return this.mascota?.imagenUrls && this.mascota.imagenUrls.length > 0
      ? this.mascota.imagenUrls[0]
      : null;
  }
}