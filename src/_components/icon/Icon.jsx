import React from 'react'
import { ReactComponent as Emoji } from 'Assets/icons/svg/emoji.svg'
import { ReactComponent as Travel } from 'Assets/icons/svg/travel.svg'
import { ReactComponent as Qna } from 'Assets/icons/svg/qna.svg'
import { ReactComponent as Miscellaneous } from 'Assets/icons/svg/miscellaneous.svg'
import { ReactComponent as Funny } from 'Assets/icons/svg/funny.svg'
import { ReactComponent as Reddit } from 'Assets/icons/svg/reddit.svg'
import { ReactComponent as Quora } from 'Assets/icons/svg/quora.svg'
import { ReactComponent as Teenagers } from 'Assets/icons/svg/teenagers.svg'
import { ReactComponent as Relationship } from 'Assets/icons/svg/relationship.svg'
import { ReactComponent as Confidence } from 'Assets/icons/svg/confidence.svg'
import { ReactComponent as Pics } from 'Assets/icons/svg/pics.svg'
import { ReactComponent as Videos } from 'Assets/icons/svg/videos.svg'
import { ReactComponent as Musics } from 'Assets/icons/svg/musics.svg'
import { ReactComponent as Movies } from 'Assets/icons/svg/movies.svg'
import { ReactComponent as Sports } from 'Assets/icons/svg/sports.svg'
import { ReactComponent as Health } from 'Assets/icons/svg/health.svg'
import { ReactComponent as Fashion } from 'Assets/icons/svg/fashion.svg'
import { ReactComponent as Tips } from 'Assets/icons/svg/tips.svg'
import { ReactComponent as Motivated } from 'Assets/icons/svg/motivated.svg'
import { ReactComponent as Art } from 'Assets/icons/svg/art.svg'
import { ReactComponent as Photography } from 'Assets/icons/svg/photography.svg'
import { ReactComponent as Etc } from 'Assets/icons/svg/etc.svg'
import { ReactComponent as Comic } from 'Assets/icons/svg/comic.svg'
import { ReactComponent as Food } from 'Assets/icons/svg/food.svg'
import { ReactComponent as News } from 'Assets/icons/svg/news.svg'
import { ReactComponent as Life } from 'Assets/icons/svg/life.svg'
import { ReactComponent as Gardening } from 'Assets/icons/svg/gardening.svg'
import { ReactComponent as Pets } from 'Assets/icons/svg/pets.svg'
import { ReactComponent as Business } from 'Assets/icons/svg/business.svg'
import { ReactComponent as Stock } from 'Assets/icons/svg/stock.svg'
import { ReactComponent as Cars } from 'Assets/icons/svg/car.svg'
import { ReactComponent as Housing } from 'Assets/icons/svg/housing.svg'
import { ReactComponent as MysticalSpirituality } from 'Assets/icons/svg/mystical-spirituality.svg'
import { ReactComponent as FengShui } from 'Assets/icons/svg/fengshui.svg'
import { ReactComponent as Architecture } from 'Assets/icons/svg/architecture.svg'
import { ReactComponent as Landscape } from 'Assets/icons/svg/landscape.svg'
import { ReactComponent as School } from 'Assets/icons/svg/school.svg'
import { ReactComponent as Books } from 'Assets/icons/svg/books.svg'
import { ReactComponent as Literature } from 'Assets/icons/svg/literature.svg'
import { ReactComponent as NoSleep } from 'Assets/icons/svg/nosleep.svg'
import { ReactComponent as History } from 'Assets/icons/svg/history.svg'
import { ReactComponent as Astronomy } from 'Assets/icons/svg/astronomy.svg'
import { ReactComponent as Philosophy } from 'Assets/icons/svg/philosophy.svg'
import { ReactComponent as Horoscope } from 'Assets/icons/svg/horoscope.svg'
import { ReactComponent as ScienceAndTechnology } from 'Assets/icons/svg/science-and-technology.svg'
import { ReactComponent as Engineering } from 'Assets/icons/svg/engineering.svg'
import { ReactComponent as Game } from 'Assets/icons/svg/game.svg'
import { ReactComponent as Math } from 'Assets/icons/svg/math.svg'
import { ReactComponent as VietNam } from 'Assets/icons/svg/vietnam.svg'
import { ReactComponent as World } from 'Assets/icons/svg/world.svg'

export const Icons = {
  Emoji: 'Emoji',
  World: 'World',
  VietNam: 'VietNam',
  Math: 'Math',
  Engineering: 'Engineering',
  Game: 'Game',
  ScienceAndTechnology: 'ScienceAndTechnology',
  Horoscope: 'Horoscope',
  Travel: 'Travel',
  Philosophy: 'Philosophy',
  Qna: 'Qna',
  NoSleep: 'NoSleep',
  Astronomy: 'Astronomy',
  History: 'History',
  Architecture: 'Architecture',
  Landscape: 'Landscape',
  FengShui: 'FengShui',
  Books: 'Books',
  Literature: 'Literature',
  School: 'School',
  Housing: 'Housing',
  MysticalSpirituality: 'MysticalSpirituality',
  Cars: 'Cars',
  Stock: 'Stock',
  Business: 'Business',
  Reddit: 'Reddit',
  Miscellaneous: 'Miscellaneous',
  Quora: 'Quora',
  Funny: 'Funny',
  Confidence: 'Confidence',
  Pics: 'Pics',
  Relationship: 'Relationship',
  Teenagers: 'Teenagers',
  Videos: 'Videos',
  Musics: 'Musics',
  Movies: 'Movies',
  Sports: 'Sports',
  Health: 'Health',
  Tips: 'Tips',
  Photography: 'Photography',
  Fashion: 'Fashion',
  Motivated: 'Motivated',
  Art: 'Art',
  Gardening: 'Gardening',
  Pets: 'Pets',
  Life: 'Life',
  News: 'News',
  Comic: 'Comic',
  Etc: 'Etc',
  Food: 'Food',
}

const IconComponents = {
  Emoji,
  World,
  VietNam,
  Math,
  Engineering,
  Game,
  ScienceAndTechnology,
  Horoscope,
  Travel,
  Philosophy,
  Qna,
  NoSleep,
  Astronomy,
  History,
  Architecture,
  Landscape,
  FengShui,
  Books,
  Literature,
  School,
  Housing,
  MysticalSpirituality,
  Cars,
  Stock,
  Business,
  Reddit,
  Miscellaneous,
  Quora,
  Funny,
  Confidence,
  Pics,
  Relationship,
  Teenagers,
  Videos,
  Musics,
  Movies,
  Sports,
  Health,
  Tips,
  Photography,
  Fashion,
  Motivated,
  Art,
  Gardening,
  Pets,
  Life,
  News,
  Comic,
  Etc,
  Food,
}

export const Icon = ({ icon, clickable, color, ...rest }) => {
  const IconFile = IconComponents[icon]

  return <IconFile {...rest} />
}
