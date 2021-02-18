import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  mainCards = [
    {
      title: 'Создать',
      desc:
        'Здесь вы можете сократить вашу ссылку, добавить к ней описаие, а затем поделиться ей с друзьями',
      to: '/content',
      queryParam: { create: true },
    },
    {
      title: 'Мои ссылки',
      desc:
        'Здесь вы можете просмотреть все ваши ссылки, а так же удалить те, которые вам уже не нужны',
      to: '/content',
      queryParam: { myLinks: true },
    },
    {
      title: 'Моя статистика',
      desc:
        'Здесь вы найдете информацию о вашей статиске. Общее количетсво ваших ссылок, сколько раз по ним переходили, самые популярные ваши ссылки',
      to: '/content',
      queryParam: { stat: true },
    },
  ];

  constructor() {}

  show() {}

  ngOnInit(): void {}
}
