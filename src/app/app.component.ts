import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MaterialModule } from './shared/material.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  private iconRegistry = inject(MatIconRegistry);
  private sanitizer = inject(DomSanitizer);


  ngOnInit(): void {
    this.iconRegistry.addSvgIcon('google', this.sanitizer.bypassSecurityTrustResourceUrl('/icon-google.svg'))
  }
}
