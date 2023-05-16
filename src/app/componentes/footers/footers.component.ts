import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-footers',
  templateUrl: './footers.component.html',
  styleUrls: ['./footers.component.css'],
})
export class FootersComponent implements OnInit {
  persona: any;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.obtenerPersona();
  }
  obtenerPersona(): void {
    this.portfolioService.obtenerPersona().subscribe((persona) => {
      this.persona = persona;
    });
  }
}
