import {Component, OnInit} from '@angular/core';

export interface IQuestion {

  title: string;

  answer: string;
}

@Component({
  selector: 'app-landing-faq',
  templateUrl: './landing-faq.component.html',
  styleUrls: ['./landing-faq.component.scss']
})
export class LandingFaqComponent implements OnInit {

  readonly questions: IQuestion[] = [{
    title: 'Pourquoi utiliser un gestionnaire de mots de passe ? Quelle est la valeur ajoutée pour mon entreprise ?',
    answer: 'Se remettre d’une cyberattaque coûte en moyenne 300.000 euros à une entreprise de moyenne ou petite taille. Pour une grosse entreprise ce coût monte en moyenne à 1.3 millions d’euros. La sécurité informatique d’une entreprise reposant principalement sur la gestion des accès à ses services, les mots de passe sont généralement le maillon faible de la sécurité d’une entreprise.\n' +
      'Le but de notre solution est d’automatiser la connexion de vos employés aux différents services qu’utilise votre entreprise. De cette façon ils n’ont pas à retenir de longs et complexes mots de passe sans pour autant compromettre la sécurité de leur compte en les simplifiants.\n' +
      'De plus l’automatisation de la connexion permettra à vos employés de pouvoir utiliser tous vos services instantanément sans avoir à se souvenir d’un mot de passe ou effectuer une fastidieuse procédure de réinitialisation d’accès.',
  }, {
    title: 'Comment assurons-nous la sécurité de vos mots de passe ?',
    answer: 'Nous chiffrons chaque donnée avec votre mot de passe primaire avant son envoi sur nos serveur. Pour cela nous utilisons un chiffrement AES 256, l’algorithme de chiffrement le plus sûr existant actuellement.',
  }, {
    title: 'Pourquoi nous faire confiance ?',
    answer: 'Vous n’avez pas besoin de nous faire confiance pour utiliser notre solution. En effet toute l’architecture de Harpokrat est pensée pour être sûre et pour cela nous nous assurons que vos données confidentielles ne quittent jamais votre appareil. Toutes les données que nous stockons sur nos serveurs sont chiffrées par de l’AES 256, l’algorithme de chiffrement le plus sûr existant actuellement. Même si notre entreprise était malveillante nous serions dans l’impossibilité d’accéder à vos données.',
  }, {
    title: 'Comment installer Harpokrat dans votre entreprise ?',
    answer: 'Pour installer Harpokrat il vous suffit de créer un compte entreprise sur notre site puis d’ajouter les adresses email de vos employés sur la console d’administration. Ils recevront ensuite un mail qui leur permettra de créer un compte utilisateur ou de lier un compte existant à votre entreprise.\n' +
      'Vous et vos employés pourrez ensuite ajouter des mots de passe et des accès à différents services sur votre compte et Harpokrat s’occupe du reste.',
  }, {
    title: 'Quelles sont les plateformes supportés par Harpokrat ?',
    answer: 'Notre solution est compatible avec la plupart des systèmes existants: MacOS, Windows, Android, IOS, etc… Mais aussi directement avec les navigateurs web les plus connus. Vous pouvez retrouver la liste complète des plateformes compatibles sur la page de téléchargement.',
  }, {
    title: 'Que se passerait-il si nos serveurs étaient attaqués ?',
    answer: 'Malgré de très nombreux mécanismes et systèmes de sécurité mis en place sur notre infrastructure, notre solution est développée de façon à considérer directement dans son fonctionnement que nos serveurs puissent être attaqués et c’est pourquoi aucune information sensible n’est stockée sur nos serveurs. Votre mot de passe principal ne quitte jamais votre appareil et les données stockées sur nos serveurs sont chiffrées par un algorithme ultra sécurisé avant même qu’elles ne quittent votre ordinateur.\n' +
      'L’algorithme utilisé est de l’AES 256, l’algorithme de chiffrement le plus sûr existant. Pour vous donner une idée de la difficulté pour un pirate d’attaquer un tel chiffrement vous pouvez consulter la page d’explication de l’AES 256.',
  }, {
    title: 'Est-ce qu’il est possible de partager certains mots de passe entre collaborateurs ?',
    answer: 'Oui et ceci de façon totalement sécurisée grâce à l’utilisation d’un chiffrement asymétrique. Pour comprendre le chiffrement asymétrique vous pouvez consulter la page d’explication du chiffrement asymétrique.',
  }, {
    title: 'Comment sont traités les mots de passe d’un collaborateur ayant quitté l’entreprise ?',
    answer: 'Harpokrat propose la possibilité de révoquer instantanément et automatiquement tous les accès d’un employé sur les services d’une entreprise. De plus tous les accès et mots de passe partagés avec un employé sont automatiquement réinitialisés lorsqu’ils ne sont plus partagés avec lui. Vous n’aurez jamais été aussi serein après le départ d’un collaborateur.',
  }, {
    title: 'Est-il possible de repérer des actions suspecte de la part d’un utilisateur ?',
    answer: 'La console d’administration vous informera dans le cas de la détection d’une utilisation anormale de Harpokrat par un de vos employés. Elle vous informera de la même façon dans le cas d’une faille de sécurité concernant un des accès de votre entreprise. De plus vous pouvez visualiser des rapports d’utilisation des services de votre entreprise par vos collaborateurs.',
  }];

  constructor() {
  }

  ngOnInit() {
  }

}
