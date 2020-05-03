import {Component, OnInit} from '@angular/core';

interface IText {

  title: string;

  text: string;
}

@Component({
  selector: 'app-landing-big-text',
  templateUrl: './landing-big-text.component.html',
  styleUrls: ['./landing-big-text.component.scss']
})
export class LandingBigTextComponent implements OnInit {

  texts: IText[] = [{
    title: 'Reprenez le contrôle de votre infrastructure numérique.',
    text: 'Grâce à Harpokrat vos accès n’auront jamais été aussi bien gardés. L’utilisation des méthodes de chiffrement et de dérivation de clé les plus puissantes et sécurisées existantes assure une sécurité absolue pour l\'infrastructure informatique de votre entreprise. Ayez de nouveau confiance en vos employés en utilisant notre console d’administration sécurisée afin de gérer les droits et accès des comptes de vos collaborateurs sur les services utilisés par votre entreprise.'
  }, {
    title: 'Simplifiez la vie de vos employés.',
    text: 'Parce que nous croyons que la productivité d’une entreprise dépend de la simplicité d’utilisation de ses outils par les employés, nous pensons que la connexion automatique est une fonctionnalité nécessaire à tout collaborateur. Permettre à l’utilisateur de s’authentifier rapidement et facilement est indispensable. Avec Harpokrat plus de procédure fastidieuse de réinitialisation de mot de passe ou de compte bloqué à cause d’un trop grand nombre de tentatives de connexion.',
  }];

  constructor() {
  }

  ngOnInit() {
  }

}
