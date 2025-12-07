import {
  Injectable,
  Renderer2,
  RendererFactory2,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private prefersDarkScheme?: MediaQueryList;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);

    if (isPlatformBrowser(this.platformId)) {
      this.prefersDarkScheme = window.matchMedia(
        '(prefers-color-scheme: dark)'
      );
      this.initializeTheme();
      this.listenToSystemThemeChanges();
    }
  }

  private initializeTheme(): void {
    const savedTheme =
      (this.getSavedTheme() as 'light' | 'dark' | 'auto') || 'auto';
    this.applyTheme(savedTheme);

    // Animación de entrada suave
    setTimeout(() => {
      if (isPlatformBrowser(this.platformId)) {
        document.body.style.opacity = '1';
      }
    }, 100);
  }

  toggleTheme(): void {
    const current = this.getSavedTheme() || 'light';
    if (current === 'dark') {
      this.applyTheme('light');
    } else {
      this.applyTheme('dark');
    }
  }

  applyTheme(theme: 'light' | 'dark' | 'auto'): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    const themeText = document.querySelector('.theme-text');
    
    if (theme === 'light') {
      this.setLightTheme(body, themeIcon, themeText);
    } else if (theme === 'dark') {
      this.setDarkTheme(body, themeIcon, themeText);
    } else if (theme === 'auto') {
      if (this.prefersDarkScheme?.matches) {
        this.setDarkTheme(body, themeIcon, themeText);
      } else {
        this.setLightTheme(body, themeIcon, themeText);
      }
      if (themeIcon) themeIcon.className = 'fas fa-adjust theme-icon';
      if (themeText) themeText.textContent = 'Auto';
    }

    this.saveTheme(theme);
  }

  setTheme(theme: 'light' | 'dark' | 'auto'): void {
    this.applyTheme(theme);
  }

  private setLightTheme(
    body: HTMLElement,
    themeIcon: Element | null,
    themeText: Element | null
  ): void {
    body.classList.remove('bg-dark', 'text-light');
    body.classList.add('bg-light', 'text-dark');

    if (themeIcon) themeIcon.className = 'fas fa-sun theme-icon';
    if (themeText) themeText.textContent = 'Claro';
  }

  private setDarkTheme(
    body: HTMLElement,
    themeIcon: Element | null,
    themeText: Element | null
  ): void {
    body.classList.remove('bg-light', 'text-dark');
    body.classList.add('bg-dark', 'text-light');

    if (themeIcon) themeIcon.className = 'fas fa-moon theme-icon';
    if (themeText) themeText.textContent = 'Oscuro';
  }

  private listenToSystemThemeChanges(): void {
    if (this.prefersDarkScheme) {
      this.prefersDarkScheme.addEventListener('change', () => {
        const currentTheme = this.getSavedTheme();
        if (currentTheme === 'auto') {
          this.applyTheme('auto');
        }
      });
    }
  }

  private saveTheme(theme: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', theme);
    }
  }

  public getSavedTheme(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('theme');
    }
    return null;
  }

  setupThemeListeners(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach((option) => {
      option.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const theme = (option as HTMLElement).getAttribute('data-theme') as
          | 'light'
          | 'dark'
          | 'auto';
        if (theme) {
          this.applyTheme(theme);
        }
      });
    });
  }
}
