'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Products',
      [
        {
          name: 'Maçã Gala',
          description:
            'Suculenta maçã gala, com sua coloração avermelhada e polpa macia, ainda se apresenta rica em açúcares!',
          price: 3.89,
          quantity: 73,
          thumbnail: 'images/maca_gala.png',
        },
        {
          name: 'Maçã Red',
          description:
            'Suculenta maçã Red argentina, com sua coloração avermelhada brilhante, apresenta um sabor doce e de fácil digestão.',
          price: 3.52,
          quantity: 65,
          thumbnail: 'images/maca_red.png',
        },
        {
          name: 'Maçã Verde',
          description:
            'Suculenta maçã verde, com sua coloração esverdeada e polpa crocante, rica em clorofila, é a mais indicada para acompanhamento em pratos salgados.',
          price: 4.79,
          quantity: 96,
          thumbnail: 'images/maca_verde.png',
        },
        {
          name: 'Maçã Fuji',
          description:
            'Suculenta maçã fuji, com sua coloração avermelhada sobre o fundo verde e polpa mais crocante e suculenta, indicada na preparação de pratos doces!',
          price: 2.64,
          quantity: 21,
          thumbnail: 'images/maca_fuji.png',
        },
        {
          name: 'Banana Nanica',
          description:
            'Também conhecida como banana d’água e banana-anã, tem polpa doce e bem macia. Ingrediente fundamental de várias sobremesas.',
          price: 4.99,
          quantity: 50,
          thumbnail: 'images/banana_nanica.png',
        },
        {
          name: 'Banana da Terra',
          description:
            'A maior de todas as bananas é também a rainha delas na cozinha. Como contém mais amido do que açúcares em sua composição, fica melhor quando é cozida, assada, frita ou grelhada.',
          price: 7.89,
          quantity: 53,
          thumbnail: 'images/banana_terra.png',
        },
        {
          name: 'Banana Maçã',
          description:
            'É a eleita de Mara Salles para ser comida in natura, bem madurinha. De tamanho variado, tem casca fina e polpa branca e aromática.',
          price: 5.5,
          quantity: 21,
          thumbnail: 'images/banana_maca.png',
        },
        {
          name: 'Banana Prata',
          description:
            'O formato do fruto é ligeiramente diferente: reto, com cinco facetas. Sua polpa é consistente e menos adocicada do que a banana-nanica. Entra no preparo de bolos e tortas e tem a vantagem de apresentar maior durabilidade do que as outras.!',
          price: 6.99,
          quantity: 40,
          thumbnail: 'images/banana_prata.png',
        },

        {
          name: 'Pera Willians',
          description:
            'Dura e ligeiramente ácida, sendo indicada para cozer sem se desmanchar.',
          price: 9.99,
          quantity: 72,
          thumbnail: 'images/pera_willians.png',
        },
        {
          name: "Pera-d'água",
          description: 'Possui uma polpa delicada.',
          price: 12.99,
          quantity: 24,
          thumbnail: 'images/pera_dagua.png',
        },
        {
          name: "Pera d'Anjou",
          description: 'É pequena e verde.',
          price: 14.9,
          quantity: 100,
          thumbnail: 'images/pera_danjou.png',
        },
        {
          name: 'Pera red',
          description:
            'Tem esse nome por ter a casca vermelha e é muito suculenta.',
          price: 9.99,
          quantity: 9,
          thumbnail: 'images/pera_red.png',
        },

        {
          name: 'Abacaxi Perola',
          description:
            'Casca amarela, polpa branca, levemente ácida, suculenta, saborosa.',
          price: 10.24,
          quantity: 39,
          thumbnail: 'images/abacaxi_perola.png',
        },
        {
          name: 'Abacaxi Hawai',
          description:
            'Suculenta fruta tropical apreciadas não só por seu sabor doce e azedo característico, mas por seus imensos benefícios à saúde.',
          price: 8.95,
          quantity: 79,
          thumbnail: 'images/abacaxi_hawai.png',
        },
        {
          name: 'Manga Rosa',
          description:
            'A manga rosa é uma espécie encontrada com mais facilidade no nordeste do Brasil, também sendo conhecida como Rosa da Bahia ou Rosa de Pernambuco. Por ser muito fibrosa e bem doce, ela é mais usada para preparar sucos ou sobremesas na qual ela será triturada.',
          price: 6.45,
          quantity: 98,
          thumbnail: 'images/manga_rosa.png',
        },
        {
          name: 'Manga Tommy',
          description:
            'A manga Tommy é o tipo mais encontrado e produzido no Brasil, porque ela é mais resistente e tende a durar mais nas prateleiras dos supermercados. Ela é um pouco menos fibrosa e também menos doce. É muito utilizada pela indústria na produção de sucos e sorvetes.',
          price: 5.99,
          quantity: 89,
          thumbnail: 'images/manga_tommy.png',
        },
        {
          name: 'Manga Espada',
          description:
            'A manga espada também é uma das mais conhecidas e encontradas no Brasil, assim como a Tommy. A diferença está na produção: a espada é produzida apenas 2 vezes por ano. Ela é um pouco mais comprida em relação aos outros tipos de manga e a sua casca costuma ser um pouco mais verde, mesmo quando está madura.',
          price: 4.87,
          quantity: 10,
          thumbnail: 'images/manga_espada.png',
        },
        {
          name: 'Manga Palmer',
          description:
            'A manga Palmer teve sua primeira produção na década de 1940 em Miami, nos Estados Unidos. Somente na década de 1960 que ela foi trazida para o Brasil. Ela se adaptou muito bem ao clima brasileiro, fazendo com que fosse fácil seu cultivo. A grande característica desse tipo de manga é o caroço, que é bem menor, fazendo com que ela tenha mais polpa.',
          price: 3.95,
          quantity: 33,
          thumbnail: 'images/manga_palmer.png',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {});
  },
};
