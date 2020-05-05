import {AfterContentInit, Component, OnDestroy} from '@angular/core';
import {BehaviorSubject, interval, Observable, timer} from "rxjs";
import {map, switchMap, switchMapTo, tap} from "rxjs/operators";

interface ISentence {
  text: string;
  icon: string;
}

@Component({
  selector: 'app-landing-short-text-card',
  templateUrl: './landing-short-text-card.component.html',
  styleUrls: ['./landing-short-text-card.component.scss']
})
export class LandingShortTextCardComponent implements OnDestroy, AfterContentInit {

  readonly sentences: ISentence[] = [
    {
      text: 'Boostez la productivité de votre entreprise avec la connexion instantanée. Laissez la saisie automatique de Harpokrat vous connecter sur tous les services que vous utilisez.',
      icon: 'trending_up',
    },
    {
      text: 'Un design pensé sécurité avant tout. Avec l’utilisation des méthodes de chiffrement et de dérivation les plus sécurisées jamais inventées vos mots de passe n’ont jamais été aussi sûrement gardés.',
      icon: 'security',
    },
    {
      text: 'Gérez les accès de vos employés à tous vos services sur une console d’administration centralisée. Gérez tous les droits de vos collaborateurs sur une plateforme unique.',
      icon: 'group',
    },
    {
      text: 'Consultez les différents rapports d’utilisation de Harpokrat au sein de votre entreprise et apprenez combien de temps vos employés ont gagné en utilisant la connexion automatique. Soyez informé rapidement des alertes de sécurité concernant vos accès.',
      icon: 'insert_chart_outlined',
    },
  ];

  readonly selectedObservable: BehaviorSubject<ISentence>;

  progressObservable: Observable<number>;

  private readonly $changeSpeed = 5000;

  private $lastChange: number;

  constructor() {
    this.selectedObservable = new BehaviorSubject<ISentence>(this.sentences[0]);
  }

  ngAfterContentInit(): void {
    this.$lastChange = Date.now();
    this.progressObservable = interval(10).pipe(
      map(() => (Date.now() - this.$lastChange) / this.$changeSpeed),
    );
    this.selectedObservable.pipe(
      switchMap((selected) => timer(5000).pipe(
        map(() => selected),
      )),
    ).subscribe((selected) => {
      const index = this.sentences.indexOf(selected);
      this.select(this.sentences[(index + 1) % this.sentences.length]);
    });
  }

  ngOnDestroy() {
    this.selectedObservable.complete();
  }

  select(sentence: ISentence) {
    this.selectedObservable.next(sentence);
    this.$lastChange = Date.now();
  }

}
